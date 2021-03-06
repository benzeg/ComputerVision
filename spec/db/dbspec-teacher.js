const Sequelize = require('sequelize');
const mysql = require('mysql');
const expect = require('chai').expect;
const Teachers = require('./../../db/dbModels/teacherModel.js').Teachers;

xdescribe('Database Unit Testing - Teachers', () => {
  let dbConnection;

  beforeEach((done) => {

    //new connection to database
    dbConnection = mysql.createConnection({
      user: 'root',
      password: '',
      database: 'computervision'
    });

    //establish connection
    dbConnection.connect();

    //new Sequelize in new connection
    let db = new Sequelize('computervision', 'root', '');

    //define schema based on imported teacherModel schema
    db.define('Teachers', Teachers.schema, Teachers.options).sync().then(() => {
      //clear contents after each test
      //change to delete with relational data
      let tablename = 'Teachers';
      dbConnection.query('truncate ' + tablename, done);
    });
  });

  //end connection after each test
  afterEach(() => {
    dbConnection.end();
  })

  it('Should have a username', () => {
    Teachers.build({
      username: 'chemteacher',
      password: 'ochem4lyfe'
    }).save().then((savedTeacher) => {
      expect(savedTeacher.username).to.equal('chemteacher');
    });
  });

  it('Should have a password that is hashed', () => {
    let hashBegin = '$2a$10';
    Teachers.build({
      username: 'mathteacher',
      password: 'thisIsSupposedTobeHashed'
    }).save().then((savedTeacher) => {
      expect(savedTeacher.password).to.not.equal('thisIsSupposedTobeHashed');
      expect(savedTeacher.password.slice(0,6)).to.equal(hashBegin);
    });
  });
});