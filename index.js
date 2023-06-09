//Library
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

//Node modules
const inquirer = require("inquirer");
const fs = require("fs");

const path = require("path");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.
const memberData = [];
const questions = async () => {
    const answers = await inquirer
      .prompt([
        {
          type: "input",
          message: "What is the manager's name?",
          name: "name",
        },
        {
          type: "input",
          message: "What is the manager's id?",
          name: "id",

        },
        {
          type: "input",
          message: "What is the manager's email address?",
          name: "email",
        },
        {
         type: "input",
         message: "What is the manager's office number?",
         name: "officeNumber",
        },
        {
          type: "list",
          message: "Which type of team member would you like to add?",
          name: "role",
          choices: ["Add an Engineer", "Add an Intern",],
        },
      ])
      const newManager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
        memberData.push(newManager);
  
        if (answers.role === "Add an Engineer") {
          const answers = await inquirer
            .prompt([
                {
                type: "input",
                message: "What is the engineer's name?",
                name: "name",
                },
                {
                type: "input",
                message: "What is the engineer's id?",
                name: "id",
                },
                {
                type: "input",
                message: "What is the engineer's email address?",
                name: "email",
                },
                {
                type: "input",
                message: "What is the engineer's GitHub username?",
                name: "github",
                },
            ])
              const newEngineer = new Engineer(
                answers.name,
                answers.id,
                answers.email,
                answers.github
              );
              memberData.push(newEngineer);
            
          // if intern selected 
        } else if (answers.role === "Add an Intern") {
          const internAns = await inquirer
          .prompt([
                {
                type: "input",
                message: "What is the intern's name?",
                name: "name",
                },
                {
                type: "input",
                message: "What is the intern's id?:",
                name: "id",
                },
                {
                type: "input",
                message: "What is the intern's email address?",
                name: "email",
                },
                {
                type: "input",
                message: "What is the intern's school name?",
                name: "school",
                },
            ])
            
            const newIntern = new Intern(
              answers.name,
              answers.id,
              answers.email,
              answers.school
            );
            memberData.push(newIntern);          
        } 
  
  }; 

  async function promptquestions() {
    await questions()
    
    const nextMember = await inquirer
      .prompt([
        {
          name:'addMember',
          type: 'list',
          choices: ['Add another member', 'Finish building the team'],
          message: "Would you like to add another member?"
        }
      ])
  
      if (nextMember.addMember === 'Add another member') {
        return promptquestions()
      } 
      return createTeam();
  }  
  
  promptquestions();
  
  function createTeam () {
    console.log("Your Team Summary is ready", memberData)
    fs.writeFileSync(
      "./output/index.html",
      render(memberData),
      "utf-8"
    );
  }