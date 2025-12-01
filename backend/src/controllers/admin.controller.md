const Song = require("../models/song.model");
const Album = require("../models/album.model");
const cloudinar = require("../lib/cloudinary");


const uploadCloudinary = async (file) => {
  try {
    const result = await cloudinar.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    })
    return result.secure_url
  } catch (err) {
    console.log("Error inuploadTocloudinary", err);
    throw new Error(err)

  }
}



const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({
        message: "Please upload all files"
      })
    }

    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile
    const imageFile = req.files.imageFile

    const audioUrl = await uploadCloudinary(audioFile)
    const imageUrl = await uploadCloudinary(imageFile);

    const song = new Song(
      {
        title,
        artist,
        audioUrl,
        imageUrl,
        duration,
        albumId: albumId || null,
      }
    )
    await song.save()
    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }


    res.status(201).json({
      success: true,
      message: "Song Create Successfully",
      song
    })
  } catch (err) {
    console.log(err);

    res.status(500).json({
      messsag: "Internal Server Error"
    });

    next(err)
  }
}



const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;

    const song = await Song.findById(id);

    // if song belongs to an album, update the album's songs array
    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }

    await Song.findByIdAndDelete(id);

    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    console.log("Error in deleteSong", error);
    next(error);
  }
}

const createAlbum = async (req, res) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const { imageFile } = req.files;

    const imageUrl = await uploadCloudinary(imageFile);

    const album = new Album({
      title,
      artist,
      imageUrl,
      releaseYear,
    });

    await album.save();

    res.status(201).json(album);
  } catch (error) {
    console.log("Error in createAlbum", error);
    next(error);
  }

}

const deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    await Song.deleteMany({ albumId: id });
    await Album.findByIdAndDelete(id);
    res.status(200).json({ message: "Album deleted successfully" });
  } catch (error) {
    console.log("Error in deleteAlbum", error);
    next(error);
  }
}

const checkAdmin = async (req, res, next) => {
  res.status(200).json({ admin: true });
};

module.exports = {
  createSong,
  deleteSong,
  createAlbum,
  deleteAlbum,
  checkAdmin
}