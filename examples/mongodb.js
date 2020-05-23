const mongoose = require('mongoose');

// 1. Connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/mongo-exercises', { useNewUrlParser: true })
    .then(() => console.log("connected successfully to MongoDB"))
    .catch((err) => console.log("Could not connect to MongoDB..", err))

// 2. Prepare schema
const courseSchema = new mongoose.Schema({
    author: String,
    name: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
})

// 3. create Class with model of schema
const Course = mongoose.model('Course', courseSchema);

// 4. Start playing
async function getBackendCourses() {
    return await Course
        .find({ isPublished: true, tags: 'backend' })
        .sort({ name: 1 })
        .select({ name: 1, author: 1 })
}

async function updateCourse(id) {
    // One way
    const course1 = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Mosh',
            isPublished: false
        }
    }, {new: true})

    // Send way - Only return result whether deleted or not
    const result = await Course.update({_id: id}, {
        $set: {
            author: 'Mosh',
            isPublished: false
        }
    })

    // Third way: find by query param
    const course2 = await Course.findById(id);
    if(!course) return;

    course2.isPublished = true;
    course2.author = "Some other operator"

    const updatedCourse = await course2.save();
    console.log(updatedCourse);

}

async function getFilteredCourses() {
    // One way

    // return await Course
    //     .find({ isPublished: true, tags: { $in: ['frontend', 'backend']} })
    //     .sort('-price')
    //     .select('name author price')


    // return await Course
    //     .find({ isPublished: true })
    //     .or([{ tags: 'frontend' }, { tags: 'backend' }])
    //     .sort('-price')
    //     .select('name author price')

    return await Course
        .find({ isPublished: true })
        .or([{ price: { $gte: 15 } }, { name: /.*by.*/ }])
        .sort('-price')
        .select('name author price')
}

async function run() {
    const backendCourses = await getBackendCourses();
    const allCourses = await getFilteredCourses();
    // console.log(backendCourses);
    console.log(allCourses);
}

run();




