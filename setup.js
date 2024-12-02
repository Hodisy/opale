import { promptRepository } from './prompt-repository.js';

export const setup = async () => {
  await promptRepository.create({
    icon: '🌐',
    title: 'HTML',
    version: '1.0',
    mode: 'replace_all',
    prompt:
      'Convert the following natural language description into HTML code. Please provide only the HTML code without any extra content, comments, or markdown: "Create a header with the title \'Welcome to My Website\'." "Add a navigation bar with links to Home, About, and Contact." "Insert an image of a sunset with an alt text of \'Beautiful Sunset\'." "Make a footer that includes copyright information." "Create a section that contains three articles with headings and paragraphs." "Add an unordered list of hobbies."',
  });

  await promptRepository.create({
    icon: '📜',
    title: 'JavaScript',
    version: '1.0',
    mode: 'replace_all',
    prompt:
      'Convert the following natural language description into JavaScript code. Please provide only the JavaScript code without any extra content, comments, or markdown: "Create a function that returns the square of a number." "Define a variable to store your favorite color." "Write a loop that counts from 1 to 10 and prints each number." "Make an array of fruits and log the second fruit." "Create an object to represent a car with properties for make and model." "Implement a function that checks if a number is even or odd."',
  });

  await promptRepository.create({
    icon: '🐍',
    title: 'Python',
    version: '1.0',
    mode: 'replace_all',
    prompt:
      'Convert the following natural language description into Python code. Please provide only the Python code without any extra content, comments, or markdown: "Create a function that checks if a number is prime." "Define a variable to hold your age." "Write a for loop that iterates through a list of names and prints each name." "Make a dictionary to store employee information with keys for name and salary." "Create a function that returns the sum of two numbers." "Implement a while loop that counts down from 10 to 0."',
  });

  await promptRepository.create({
    icon: '🎨',
    title: 'CSS',
    version: '1.0',
    mode: 'replace_all',
    prompt:
      'Convert the following natural language description into CSS code. Please provide only the CSS code without any extra content, comments, or markdown: "Set the background color of the body to blue." "Make all headings center aligned." "Add a margin of 20 pixels to paragraphs." "Change the font size of buttons to 16 pixels." "Apply a border of 1 pixel solid black to images." "Set the text color to white for all list items."',
  });

  await promptRepository.create({
    icon: '📊',
    title: 'Google Sheets Formula Generator',
    version: '1.0',
    mode: 'replace_all',
    prompt:
      "Generate a Google Sheets formula to calculate the sum of a specified range of cells. Input the row number and the range (e.g., 'row 4+9') and output the corresponding SUM formula.",
  });

  await promptRepository.create({
    icon: '🐦',
    title: 'Twitter Tweets',
    version: '1.0',
    mode: 'replace_all',
    prompt:
      'Transform the following comments into concise tweets suitable for Twitter (150 characters max). Please provide only the tweet without any extra content, explanations, or markdown: "I think this video is really informative!" "This post made me laugh!" "Can someone explain this part to me?" "I completely disagree with the argument here." "Great job on this project!" "I can relate to what you’re saying, it’s so true!"',
  });

  await promptRepository.create({
    icon: '📊',
    title: 'SQL',
    version: '1.0',
    mode: 'replace_all',
    prompt:
      'Convert the following natural language description into SQL queries. Please provide only the SQL code without any extra content, comments, or markdown: "Create a table named employees with columns id, name, and department." "Insert a new record into the products table with name and price." "Select all fields from the customers table where the age is above 30." "Update the status in the orders table to shipped where order_id is 123." "Delete records from the logs table that are older than 30 days." "Count the number of orders for each customer."',
  });

  await promptRepository.create({
    icon: '👥',
    title: 'Social Media',
    version: '1.0',
    mode: 'replace_all',
    prompt:
      'Reformulate the following casual messages for sending to friends. Please provide only the rephrased text without any extra content, comments, or markdown: "Hey, how have you been?" "Want to grab coffee sometime?" "Did you catch the game last night?" "Thinking of going for a hike this weekend." "Have you seen any good movies lately?" "Let’s catch up soon, it’s been a while!"',
  });

  await promptRepository.create({
    icon: '📢',
    title: 'Comments',
    version: '1.0',
    mode: 'replace_all',
    prompt:
      'Reword the following comment for various social media platforms like Reddit, YouTube, or Facebook. Please provide just the reformulated comment without any extra content, explanations, or markdown: "I think this video is really informative!" "This post made me laugh!" "Can someone explain this part to me?" "I completely disagree with the argument here." "Great job on this project!" "I can relate to what you’re saying, it’s so true!"',
  });

  await promptRepository.create({
    icon: '💼',
    title: 'Job Motivation Letter',
    version: '1.0',
    mode: 'replace_all',
    prompt:
      'Transform the following informal motivation letter into a professional format suitable for a job application. Please provide only the revised letter without any extra content, explanations, or markdown: "I am enthusiastic about the opportunity to join your team!" "Your company’s vision really inspires me and I want to be a part of it!" "I believe that my background makes me a strong candidate!" "This position excites me because of the potential for growth!" "I admire your team\'s dedication and would love to contribute!" "I am looking forward to possibly working alongside you!"',
  });

  await promptRepository.create({
    icon: '🤖',
    mode: 'insert_at_end',
    title: 'assistant',
    version: '1.0',
    prompt: 'You are an AI assistant',
  });
};
