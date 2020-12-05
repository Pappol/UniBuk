import mongoose from 'mongoose';
import content from '../models/content.js';

export const contents_get_all = (req, res, next) => {
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
              image:doc.image,
              validFor: doc.validFor,
              tags: doc.tags,
              comments: doc.comments,
              _id: doc._id
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
        console.log("Gathered from database", doc);
        if (doc) {
          res.status(200).json({
            content: doc
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
