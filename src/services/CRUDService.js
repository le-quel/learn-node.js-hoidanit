import bcrypt from 'bcryptjs';
import db from '../models';
const salt = bcrypt.genSaltSync(10);
// var bcrypt = require('bcryptjs');
const { format } = require('mysql2');

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try{
            
            // let hashUserPasswordFromBcrypt = await hashUserPassword(data.password);
            let hashUserPasswordFromBcrypt = await hashUserPassword(data.password);
            console.log('data form service')
            console.log(data)
            console.log(hashUserPassword)
            await  db.User.create({
                email: data.email,
                password: hashUserPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
        
                roleId: data.roleID,
                });
                resolve("ok ! create new user success")
        }catch(e){
            reject(e);
        }
    })

}
 let hashUserPassword = (password) => {
    return new Promise((resolve, reject) => {
       try{
        var hashUserPassword = bcrypt.hashSync(password, salt);
        resolve(hashUserPassword);
       }catch(e) {
        reject(e);
       }




    })
 }
 let getAllUser = () => {
    return new Promise(async(resolve, reject) => {
        // dùng async await để báo cho js biết đây là một hàm bất đồng bộ
        try{
            let users = db.User.findAll({
                raw: true, // raw là dữ liệu gốc
            }); // tạo 1 biến users để gọi được đến db dùng db. (table user) sau đó dụng method findAll để đọc tất cả bảng ghi có trong bảng users
            resolve(users)  //thoát khỏi 1 promise dùng biến resolve <=> return 
        }catch(e){
            reject(e)
        }
    })
 }

 let getUserInfoById = (id) => {
   return new Promise(async(resolve, reject) => {
    try{
        let user = await db.User.findOne({
            where: {id: id},
            raw: true,
        })
        if(user){
            resolve(user)
        }
        else{
            resolve({})
        }
    }catch(e){
        reject(e)
    }
   })
  }
  
let updateUserData = (data) => {
   return new Promise(async(resolve, reject) => {
    try{
        let user = await db.User.findOne({
            where: {id: data.id}
        })
        if(user){
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;
            await user.save();
            
            let allUser = await db.User.findAll();
            resolve(allUser);

        }else{
            resolve();
        }
        await db.User.update({

        })
    }catch(e){
        console.log(e)
    }
   })
}
let deleteUserById = (userId) => {
    return new Promise(async(resolve,reject) => {
        try{
            let user = await db.User.findOne({
                where: {id: userId}
            })
            if(user){
                await user.destroy();
            }
            resolve(); // return
        }catch(e){
            reject(e);
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
   getAllUser: getAllUser,
   getUserInfoById: getUserInfoById,
   updateUserData: updateUserData,
   deleteUserById: deleteUserById,
}