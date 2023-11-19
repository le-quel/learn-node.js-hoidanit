
import db from '../models/index';
import CRUDService from '../services/CRUDService';


let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    console.log('------------------------');
    console.log(data);
    console.log('-------------------------');

    res.render('homepage.ejs', {
      data: data
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send('Internal server error');
  }
};

let getAboutPage = (req, res) => {
  return res.render('test/about.ejs');
};

let getCRUD = (req, res) => {
  return res.render('crud.ejs');
};

let postCRUD = async (req, res) => {
  try {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    console.log(req.body);
    console.log('Data:', req.body.data); // Assuming "data" is the key for the data in the request body

    return res.send('post CRUD from server');
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error');
  }
};

let displayGetCRUD = async (req, res) => {
  try {
    let data = await CRUDService.getAllUser();
    console.log('----------------------------------');
    console.log(data);
    console.log('----------------------------------');

    return res.render('displayCRUD.ejs', {
      dataTable: data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error');
  }
};

let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  console.log(userId);
  if(userId){
    let userData = await CRUDService.getUserInfoById(userId);

    // console.log('-----------------------')
    // console.log(userData) 
    // console.log('---------------------------------')
    return res.render('editCRUD.ejs' ,{
      user: userData //lấy giá trị của biến userdata gán cho biên user
    });
  }
  else{
    return res.send('user not found!');
  }
  
 
};
  let putCRUD = async(req, res) => {
    let data = req.body;
    let allUser = await CRUDService.updateUserData(data);
    return res.render('displayCRUD.ejs', {
      dataTable: allUser
    })
  }
  let deleteCRUD = async(req, res) => {
    let id = req.query.id;
    if(id){
      await CRUDService.deleteUserById(id);
      return res.send('Delete the user success')
    }
    else{
      return res.send('user not found')
    }
    
  }

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
};