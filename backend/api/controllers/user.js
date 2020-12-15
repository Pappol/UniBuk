import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Content from "../models/content.js";

export const users_get_user = (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    // .select("firstName lastName _id validFor")
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          user: doc,
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

export const user_signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(501).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              username: req.body.username,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
            });
            if (req.studentCreds) {
              user.update({
                studentCreds: {
                  university: req.body.studentCreds.university,
                  course: req.body.studentCreds.course,
                  year: req.body.studentCreds.year,
                },
              });
            }

            user
              .save()
              .then((result) => {
                // console.log(result);
                res.status(201).json({
                  message: "User created",
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
      }
    })
    .catch();
};

export const user_login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(403).json({
          message: "Auth failed:no mail found",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(402).json({
            message: "Auth failed:failed to compare hash",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token,
            id: user[0]._id,
            university: user[0].studentCreds.university,
          });
        }
        res.status(401).json({
          message: "Auth failed",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

export const user_update = (req, res, next) => {
  const id = req.params.userId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  User.update(
    {
      _id: id,
    },
    {
      $set: updateOps,
    }
  )
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "user updated",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

export const user_add = (req, res, next) => {
  const id = req.params.userId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  User.update(
    {
      _id: id,
    },
    {
      $push: updateOps,
    }
  )
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User updated",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

export const user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

export const user_get_contents = async (req, res, next) => {
  const userId = req.params.userId;
  let resources;
  try {
    resources = await Content.find({ creator: userId });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
  res.status(200).json({
    resources: resources,
  });
};
