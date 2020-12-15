import mongoose from "mongoose";
import Content from "../models/content.js";

export const contents_get_all = async (req, res, next) => {
  const university = req.query.query;
  if (university == "contents"){
    let contents;
    contents = await Content.find({});
    const newContents = []
    for (const content of contents) {
      for (const validFor of content.validFor) {
        if (validFor.university === university) {
          newContents.push(content)
        }
      }
    }
  
    return res.status(200).json({ contents: newContents });
  }
  Content.find()
    // .select("_id")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        contents: docs.map((doc) => {
          return {
            creator: doc.creator,
            date: doc.date,
            name: doc.name,
            url: doc.url,
            description: doc.description,
            image: doc.image,
            validFor: doc.validFor,
            tags: doc.tags,
            comments: doc.comments,
            _id: doc._id,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

export const contents_get_content = (req, res, next) => {
  const id = req.params.contentId;
  Content.findById(id)
    // .select(" _id")
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          content: doc,
        });
      } else {
        res.status(404).json({
          message: "No valid entry found for provided ID",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

export const contents_update_content = (req, res, next) => {
  const id = req.params.contentId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Content.updateOne(
    { _id: id },
    {
      $push: updateOps,
    }
  )
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Content updated",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

export const contents_add_answer = (req, res, next) => {
  const contentId = req.params.contentId;
  const questionId = req.params.questionId;
  Content.updateOne(
    {
      _id: contentId,
      questions: {
        $elemMatch: {
          _id: questionId,
        },
      },
    },
    {
      $push: {
        "questions.$.answers": req.body.text,
      },
    }
  )
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Added answer",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

export const edit_content = (req, res, next) => {
  const id = req.params.contentId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Content.updateOne(
    {
      _id: id,
    },
    {
      $set: updateOps,
    }
  )
    .exec()
    .then((result) => {
      //console.log('NEW CONTENT');
      //console.log(result);
      res.status(200).json({
        message: "Content updated",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

export const create_content = (req, res, next) => {
  Content.find({ name: req.body.name, creator: req.body.creator })
    .exec()
    .then((content) => {
      if (content.length >= 1) {
        return res.status(409).json({
          message: "Content with that name already exists",
        });
      } else {
        const content = new Content({
          _id: new mongoose.Types.ObjectId(),
          creator: req.body.creator,
          date: req.body.date,
          name: req.body.name,
          url: req.body.url,
          description: req.body.description,
          image: req.body.image,
        });

        content
          .save()
          .then((result) => {
            //console log result
            res.status(201).json({
              message: "Content created",
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: err,
            });
          });
      }
    });
};

export const contents_get_by_user = async (req, res, next) => {
  const userId = req.params.userId;
  let resources;
  try {
    resources = await Content.find({ creator: userId });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
  if (resources) {
    res.status(200).json({
      user: resources,
    });
  } else {
    res.status(404).json({
      message: "No valid entry found for provided ID",
    });
  }
};

export const content_add_view = async (req, res, next) => {
  const contentId = req.params.contentId;
  let resources;
  try {
    await Content.findByIdAndUpdate({ _id: contentId }, { $inc: { views: 1 } });
  } catch (err) {
    console.log("POST", err)
    res.status(500).json({
      error: err,
    });
    return;
  }
  res.status(200).json({
    message: "Views counter has been incremented"
  });
};
