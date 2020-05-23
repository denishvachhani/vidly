const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/playground', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  const course = await Course.update({ _id: courseId}, {
    $set: {
      'author.name': "mosh hamedami"
    }
  });
}

async function addAuthor(courseId, author) { 
  const course = await Course.findById(courseId);
  course.authors.push(author)
  course.save()
}

async function removeAuthor(courseId, authorId) { 
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save()
}

// addAuthor("5ec7cc0d7d905348d648a77e", new Author({ name: "denish" }));
removeAuthor("5ec7cc0d7d905348d648a77e", "5ec7cd54064fb649d6fb4034");

// createCourse('Node Course', [
//   new Author({ name: 'Mosh' }),
//   new Author({ name: 'Denish' })
// ]);
