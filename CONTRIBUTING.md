## How to contribute

Here are the instructions on setting up the project locally.

:exclamation: Replace everything in angle brackets with your _<relevant_data>_ without including the brackets

### Installation

1. Fork <a href="https://github.com/Abrosss/devquiz-quiz-app">this</a> repository.
2. Clone your fork.
   ```sh
   git clone  https://github.com/<your_name>/devquiz-quiz-app.git
   ```
3. Navigate to the project directory.
   ```sh
   cd devquiz-quiz-app
   ```
4. Add a reference to the original repository.
   ```sh
   git remote add upstream https://github.com/Abrosss/devquiz-quiz-app.git
   ```
5. Check that you now have two remotes: an origin that points to your fork, and an upstream that points to the project repository.
   ```sh
   git remote -v
   ```
6. Synchronize your local repository with the project repository. 
   ```sh
   git pull upstream main
   ```
7. Create a new branch. 
   ```sh
   git checkout -b <your_branch_name>
   ```
   
### Set up the environment

8. **Install NPM packages**
   ```sh
   npm install
   ```
   
### Make changes and create a pull request

10. Make changes to files.
11. Track your changes.
   ```sh
   git add .
   ```
12. Commit your changes.
   ```sh
   git commit -m "<description_of_changes>"
   ```
13. Push these changes in your branch to your fork
   ```sh
   git push origin <your_branch_name>
   ```
14. To create a pull request, return to your fork on GitHub, and refresh the page.Click on `compare and pull request`
15. Add a title and description to your pull request explaining the changes you made.
16. Click the green `Create pull request` button.
