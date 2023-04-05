const mongoose = require('mongoose');
const userModel = require("../model/userModel")
const postModel = require("../model/postModel")
const commentModel = require("../model/commentModel")

const createPost = async function (req, res) {
    try {
        const data = req.body
        //  data validation  

        if (!data || Object.keys(data).length === 0) return res.status(400).send({ status: false, msg: "plz enter some data" })

        let { userId, desc, img, likes, title, isDeleted } = data;

        let user = await userModel.findById(userId);
        let token = req["userId"];

        // authorization
        if (token != userId) {
            return res.status(403).send({ status: false, msg: "You are not authorized to access this data" })
        }
        
        // let files = req.files;
        // let uploadedFileURL = await uploadFile(files[0]);
        // data.img = uploadedFileURL;

        let post = await postModel.create(data);

        return res.status(201).send({ status: true, data: post })

    } catch (err) {
        res.status(500).send({ status: "error", error: err.message })
    }
}



const GetPostById = async function (req, res) {
    try {
        const postId = req.params.postId
        //  data validation  

        let up = await postModel.findOne({ _id: postId, isDeleted: false })
        let user = await commentModel.find({ postId: postId, isDeleted: false }).count()

        let Doc = {
            post: up,
            commentNo: user
        }

        return res.status(201).send({ status: true, data: Doc })

    } catch (err) {
        res.status(500).send({ status: "error", error: err.message })
    }
}





const GetAllPost = async function (req, res) {
    try {
        const userId = req.params.userId
        //  data validation  


        


        let up = await postModel.find({userId: userId, isDeleted: false })



         

       




        return res.status(201).send({ status: true, data: up })



    } catch (err) {
        res.status(500).send({ status: "error", error: err.message })
    }
}




const DeletePost = async function (req, res) {
    try {
        const postId = req.params.postId
        const userId = req.params.userId
        //  data validation  





        let up = await postModel.findOneAndUpdate({_id:postId,userId:userId}, {

            $set: { isDeleted: true}

        }, { new: true })



        let token = req["userId"]

        // authorization
        if (token != userId) {
         return res.status(403).send({ status: false, msg: "You are not authorized to access this data" })
        }

       




        return res.status(201).send({ status: true, data: `post Deleted Successfully postId is :${postId}` })



    } catch (err) {
        res.status(500).send({ status: "error", error: err.message })
    }
}




module.exports.createPost = createPost

module.exports.GetPostById = GetPostById

module.exports.GetAllPost = GetAllPost

module.exports.DeletePost = DeletePost
