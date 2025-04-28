use('test');


collections.forEach(collectionName => {
    print(`\nSearching in collection: ${collectionName}`);
    const results = db.getCollection(collectionName).find({
        $or: [
            { email: "mentor@gmail.com" }
        ]
    }).toArray();
    print(results.length);
    if (results.length > 0) {
        printjson(results);
    } else {
        print("No matching documents found.");
    }
});


const usersWithMentor = db.users.find({
    mentorId: { $ne: null }
}).toArray();
print(usersWithMentor.length);
if (usersWithMentor.length > 0) {
    printjson(usersWithMentor);
} else {
    print("No users found with mentorId not null.");
}

// Arrays to store usernames
let menteesWithMentor = [];
let menteesWithoutMentor = [];

// Fetch mentees who have a mentor
menteesWithMentor = db.users.find(
    { role: "mentee", mentorId: { $ne: null } },
    { username: 1, _id: 0 }
).toArray().map(user => user.username);

// Fetch mentees who do not have a mentor
menteesWithoutMentor = db.users.find(
    { role: "mentee", mentorId: null },
    { username: 1, _id: 0 }
).toArray().map(user => user.username);

// Print the arrays
print("Mentees with mentor assigned:");
printjson(menteesWithMentor);

print("\nMentees without mentor assigned:");
printjson(menteesWithoutMentor);


db.mentorprofiles.find().forEach(doc => printjson(doc));

db.mentorprofiles.find({}).forEach(doc => printjson(doc));

// ←– REPLACE this with the logged-in mentor’s User._id
const myUserId = ObjectId("67fa2f10a4266a1a8d39f3ea");

// Fetch the mentor profile whose `user` field matches your ID
const myProfile = db.mentorprofiles.findOne({ user: myUserId });

// Print it out
if (myProfile) {
  printjson(myProfile);
} else {
  print("No mentor profile found for user:", myUserId);
}

db.users.find({
    role: "mentor",
}).toArray().map(userId => userId._id);

// seedAndMapProfiles.mongodb.js

/**
 * 1) Use the 'test' database
 * 2) Update the first 10 mentor user documents to new dummy names
 * 3) Map those same user IDs into your dummy mentorprofiles
 */

// 1) Switch to the test database
use('test');

// 2) Define the 10 dummy mentor names
const dummyNames = [
  "Mr. Aditya Nimbolkar",
  "Ms. Snehal Jadhav",
  "Mr. Rohan Deshmukh",
  "Mrs. Prajakta Patil",
  "Mr. Siddharth Kulkarni",
  "Ms. Aishwarya Khedekar",
  "Mr. Omkar Joshi",
  "Mrs. Manasi Bapat",
  "Mr. Amey Phadke",
  "Ms. Revati Bhave"
];

// 3) Fetch only the first 10 mentor users (only _id) sorted by _id ascending
const mentorUsers = db.users
  .find({ role: "mentor" }, { _id: 1 })
  .sort({ _id: 1 })
  .limit(dummyNames.length)
  .toArray();

// 4) Update each of these first 10 mentors' username to the corresponding dummy name
mentorUsers.forEach((u, i) => {
  db.users.updateOne(
    { _id: u._id },
    { $set: { username: dummyNames[i] } }
  );
});


const mentor = db.users.find(
    { role: "mentor" },
    { _id: 1, username: 1, email: 1 }  // project only these fields
)
.toArray()
.map(doc => ({
    id:      doc._id,
    name:    doc.username,
    contact: doc.email
}));

mentor.forEach(doc => printjson(doc));
print(mentor.length);




const mentorData = [
    {
      fullName: "Mr. Aditya Nimbolkar",
      title: "Senior Software Engineer",
      bio: "10+ years experience in full-stack development with specialization in React and Node.js. Passionate about mentoring new developers and building scalable applications.",
      expertise: ["React", "Node.js", "AWS", "Database Design", "REST APIs"],
      experience: "12 years in software development",
      profileImage: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
      user: ObjectId("67f95d7b69ac58ccfc5caebb"),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      fullName: "Ms. Snehal Jadhav",
      title: "Data Scientist",
      bio: "Expert in machine learning, data mining, and predictive modeling with a focus on healthcare and finance sectors.",
      expertise: ["Python", "TensorFlow", "Pandas", "Data Visualization"],
      experience: "8 years in data science",
      profileImage: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
      user: ObjectId("67fa2f10a4266a1a8d39f3ea"),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      fullName: "Mr. Rohan Deshmukh",
      title: "DevOps Engineer",
      bio: "Certified AWS DevOps Professional with extensive experience in CI/CD pipelines, containerization, and cloud deployments.",
      expertise: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"],
      experience: "9 years in DevOps",
      profileImage: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
      user: ObjectId("67fe058c82398472a19ee5aa"),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      fullName: "Mrs. Prajakta Patil",
      title: "Frontend Architect",
      bio: "Skilled frontend engineer specializing in modern web frameworks with a keen eye for UX/UI design.",
      expertise: ["Angular", "React", "UI/UX Design", "TypeScript", "Figma"],
      experience: "11 years in frontend development",
      profileImage: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
      user: ObjectId("67ff86c9d834af6579d6b679"),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      fullName: "Mr. Siddharth Kulkarni",
      title: "Cybersecurity Specialist",
      bio: "Hands-on experience in securing enterprise applications, network penetration testing, and ethical hacking.",
      expertise: ["Cybersecurity", "Ethical Hacking", "OWASP", "Penetration Testing"],
      experience: "7 years in cybersecurity",
      profileImage: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
      user: ObjectId("67ff8abdd834af6579d6b84d"),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      fullName: "Ms. Aishwarya Khedekar",
      title: "Cloud Solutions Architect",
      bio: "Cloud evangelist helping startups and enterprises build scalable, secure architectures on multi-cloud platforms.",
      expertise: ["AWS", "Azure", "Google Cloud", "Cloud Architecture"],
      experience: "10 years in cloud solutions",
      profileImage: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
      user: ObjectId("6800c58db76bd0abb8584dc2"),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      fullName: "Mr. Omkar Joshi",
      title: "Mobile App Developer",
      bio: "Passionate about creating high-performance Android and iOS apps with modern technologies like Flutter and React Native.",
      expertise: ["Flutter", "React Native", "Swift", "Kotlin"],
      experience: "6 years in mobile development",
      profileImage: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
      user: ObjectId("6803db83ace4f54c7e226016"),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      fullName: "Mrs. Manasi Bapat",
      title: "AI/ML Engineer",
      bio: "Focused on building intelligent systems, NLP models, and deep learning solutions for real-world applications.",
      expertise: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision"],
      experience: "7 years in AI/ML",
      profileImage: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
      user: ObjectId("680dd08d42dbfb49f8cfcb0a"),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      fullName: "Mr. Amey Phadke",
      title: "Blockchain Developer",
      bio: "Experienced in building decentralized applications, smart contracts, and blockchain integration for businesses.",
      expertise: ["Solidity", "Ethereum", "Hyperledger", "Web3.js"],
      experience: "5 years in blockchain development",
      profileImage: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
      user: ObjectId("680e429491da41402ba78ca9"),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      fullName: "Ms. Revati Bhave",
      title: "Project Manager - IT",
      bio: "Leading cross-functional teams to deliver high-quality software solutions with Agile and Scrum methodologies.",
      expertise: ["Project Management", "Agile", "Scrum", "Risk Management"],
      experience: "13 years in IT project management",
      profileImage: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
      user: ObjectId("680e55f36277b683b3ea19ca"),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];
  
  // First clear out any old profiles:
  db.mentorprofiles.deleteMany({});
  
  // Insert the new, user‐mapped profiles:
  db.mentorprofiles.insertMany(mentorData);
  
  // Verify:
  db.mentorprofiles.find({}, { user: 1, fullName: 1 }).forEach(doc => printjson(doc));
  
// const collections = db.getCollectionNames();

// collections.forEach(collectionName => {
//     db.collectionName.find({});
// });

db.getCollectionInfos();