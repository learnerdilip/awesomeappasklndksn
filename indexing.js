const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "postgres://postgres:secret@localhost:5432/postgres"
);
const JobListing = sequelize.define("employee", {
  title: {
    type: Sequelize.TEXT
  },
  company: {
    type: Sequelize.TEXT
  },
  yearsOfExperience: {
    type: Sequelize.INTEGER
  }
});
sequelize
  .sync() // Create tables if necessary
  .then(() => JobListing.truncate()) // Delete all existing rows
  .then(() =>
    Promise.all([
      // Insert 3 new rows
      JobListing.create({
        title: "Junior JavaScript developer at Travel company",
        company: "TravelBee",
        yearsOfExperience: 1
      }),
      JobListing.create({
        title: "Data Scientist [m/w] at Consulting Agency",
        company: "Can-O-Developers",
        yearsOfExperience: 4
      }),
      JobListing.create({
        title: "Web-based Game Developer Urgently Needed",
        company: "Rubbery Games",
        yearsOfExperience: 2
      })
    ])
  )
  .then(() => {
    return JobListing.findAll({
      where: {
        yearsOfExperience: {
          [Sequelize.Op.lt]: 5
        }
      }
    });
  })
  .then(items => {
    items.map(item => console.log("ITEM", item.get({ plain: true })));
  })
  .then(() =>
    JobListing.findOne({
      where: {
        company: "Rubbery Games"
      }
    })
  )
  .then(res => console.log(res.get({ palin: true })))
  .catch(console.error);
