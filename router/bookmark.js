const stringIsAValidUrl = require("../config/url_check");
const BookMark = require("../model/bookmark");
const router = require("express").Router();


//@route /api/v1/bookmark/create-bookmark
//@desc create new bookmark
router.post("/create-bookmark", async (req, res) => {
  try {
    const { title, url } = req.body;
    if (!title || !url)
      return res.status(404).json({ error: "Please Enter Required fields" });
    const isValid = stringIsAValidUrl(url);
    if (!isValid)
      return res.json({
        error: "url is not valid please enter url like http://stories.raify.me",
      });
    const newBookmark = await new BookMark({
      title,
      url,
    }).save();

    res.json({
      sucess: true,
      data: {
        bookMark: newBookmark,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//@route /api/v1/bookmark/allbookmarks?
//@desc get all bookmarks
router.get("/allBookmarks", async (req, res) => {
  try {
    let limit = Number(req.query.limit || 10);
    const page = Number(req.query.page || 1);

    const skipVal = limit * (page - 1);
    const totalDocs = await BookMark.countDocuments();

    const bookMarks = await BookMark.find().skip(skipVal).limit(limit);

    res.json({
      sucess: true,
      data: {
        bookMarks: bookMarks,
        pagenation: {
          limit,
          skip:skipVal,
          totalDocs,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router
