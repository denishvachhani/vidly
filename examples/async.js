console.log('Before');
// Consumer of Promise
// getUser(1, (user) => {
//   getRepositories(user.gitHubUsername, (repos) => {
//     getCommits(repos[0], (commits) => {
//       console.log(commits);
//     })
//   })
// });

const getUser = id => new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        resolve({ id: id, gitHubUsername: 'denvac' });
    }, 2000);
})

const getRepositories = username => new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Calling GitHub API with...', username);
        resolve(['repo1', 'repo2', 'repo3']);
    }, 2000);
})

const getCommits = repo => new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Calling GitHub API with...', repo);
        resolve(['commit']);
    }, 2000);
})

// getUser(1)
//     .then(user => getRepositories(user.gitHubUsername))
//     .then(repos => getCommits(repos[0]))
//     .then(commits=> console.log(commits))
//     .catch(error => console.log("Error ", error.message))


// Async and Await approch
async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    } catch (err) {
        console.log('Error', err.message)
    } 
}

displayCommits()


console.log('After');


// function getUser(id, callback) {
//   setTimeout(() => {
//     console.log('Reading a user from a database...');
//     callback({ id: id, gitHubUsername: 'mosh' });
//   }, 2000);
// }

// function getRepositories(username, callback) {
//   setTimeout(() => {
//     console.log('Calling GitHub API...');
//     callback(['repo1', 'repo2', 'repo3']);
//   }, 2000);
// }

// function getCommits(repo, callback) {
//   setTimeout(() => {
//     console.log('Calling GitHub API...');
//     callback(['commit']);
//   }, 2000);
// }