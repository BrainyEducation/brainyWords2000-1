const express = require('express');
const router = express.Router();


const path = require('path');

const fs = require('fs');

function textCleanup(string) {
    return string.replace(/[0-9]/g, '').replace('_', ' ');
}

// GET route for welcome screen
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Welcome!'});
});

// GET route for main street screen
router.get('/street', function (req, res, next) {
    let store = req.query.store;
    if(!store) {
        store = 0;
    }
    res.render('street', {
        layout: "streetLayout.hbs",
        title: 'Street',
        store: store
    });
});


// GET route for progress screen
router.get('/progress', function (req, res, next) {
    const email = "example email";
    const name = "example name";

    res.render('progress', {
        title: 'progress',
        stat1: '42',
        stat2: 'another statistic',
        userName: name,
        accountEmail: email
    });
});

// GET route for zoomed in street areas
router.get('/street/:closestStore/:location', function (req, res, next) {
    const categoryNum = req.params.closestStore;
    const location = req.params.location;
    //TODO: handle errors where page is not found (try catch + 404)
    res.render('zoomedIn/' + location, { layout: "streetLayout.hbs", store: categoryNum, title: 'Street'});
});

// GET route for viewing a category
router.get('/category/:categoryNum/:category', function (req, res, next) {
    const categoryNum = req.params.categoryNum;
    const category = req.params.category;
    try {
        // const audioPath = path.join(__dirname, '..', 'public/audio/categories/', category);
        // const categoryPath = path.join(__dirname, '..', 'public/images/categories/', categoryNum);
        // const categoryNameList = fs.readdirSync(categoryPath);
        // const category = categoryNameList[0];

        const imagePath = path.join(__dirname, '..', 'public/images/categories/', categoryNum, category);

        const publicImagePath = '/images/categories/' + categoryNum + '/' + category;
        const publicAudioPath = '/audio/categories/' + categoryNum + '/' + category;

        // var audioFiles = fs.readdirSync(audioPath);
        const imageFiles = fs.readdirSync(imagePath);

        const categoryData = {};

        imageFiles.forEach(function(subCategory) {
            let subCatObject;
            if (subCategory.endsWith(".png") || subCategory.endsWith(".jpg")) {
                const trimmedSubCat = subCategory.split('.')[0];

                subCatObject = {
                    imageDirectory: publicImagePath + '/' + trimmedSubCat,
                    audioDirectory: publicAudioPath + '/' + trimmedSubCat,
                    imageFile: publicImagePath + '/' + subCategory,
                    subCatName: trimmedSubCat
                };

                categoryData[trimmedSubCat] = subCatObject;
            }
        });

        res.render('category', { 
            title: category,
            layout: 'categoryLayout.hbs',
            store: categoryNum,
            category: category,
            subCategories: categoryData
        });
    } catch(error) {
        console.log(error);
        // TODO: figure out the correct way to handle this
        const err = new Error('Category does not exist!');
        err.status = 404;
        return next(err);
    }
});


// GET route for viewing a subcategory
router.get('/category/:categoryNum/:category/:subCategory', function (req, res, next) {
    // console.log("subcategory page hit!!!");
    const category = req.params.category;
    const categoryNum = req.params.categoryNum;
    const subCategory = req.params.subCategory;

    try {
        // const categoryPath = path.join(__dirname, '..', 'public/images/categories/', categoryNum);
        // const categoryNameList = fs.readdirSync(categoryPath);
        // const category = categoryNameList[0];


        const audioPath = path.join(__dirname, '..', 'public/audio/categories/', categoryNum, category, subCategory);
        const imagePath = path.join(__dirname, '..', 'public/images/categories/', categoryNum, category, subCategory);

        const publicImagePath = '/images/categories/' + categoryNum + '/' + category + '/' + subCategory;
        const publicAudioPath = '/audio/categories/' + categoryNum + '/' + category + '/' + subCategory;


        // var audioFiles = fs.readdirSync(audioPath);
        const imageFiles = fs.readdirSync(imagePath);
        const audioFiles = fs.readdirSync(audioPath);

        const subCategoryData = {};

        imageFiles.forEach(function(subCatImage) {
            const subCatName = subCatImage.split('.')[0];

            let subCatObj = {};

            if (subCatName in subCategoryData) {
                subCatObj = subCategoryData[subCatName];
                
            } 
            subCatObj['image'] = publicImagePath + '/' + subCatImage;
            subCatObj['name'] = textCleanup(subCatName);
            subCategoryData[subCatName] = subCatObj; 
        });

        audioFiles.forEach(function(subCatAudio) {
            const subCatName = subCatAudio.split('.')[0];

            let subCatObj = {};

            if (subCatName in subCategoryData) {
                subCatObj = subCategoryData[subCatName];
                
            } 
            subCatObj['audio'] = publicAudioPath + '/' + subCatAudio;
            subCategoryData[subCatName] = subCatObj; 
        });

        res.render('subCategory', { 
            title: category,
            layout: 'categoryLayout.hbs',
            category: category,
            subCategory: subCategory,
            words: subCategoryData
        });
    } catch(error) {
        console.log(error);
        // TODO: figure out the correct way to handle this
        const err = new Error('Subcategory does not exist!');
        err.status = 404;
        return next(err);
    }
});


// GET route for taking a quiz
router.get('/category/:categoryNum/:category/:subCategory/quiz', function (req, res, next) {
    // console.log("quiz page hit!!!");
    const categoryNum = req.params.categoryNum;
    const category = req.params.category;
    const subCategory = req.params.subCategory;

    try {
        // TODO - get all of the subcategory data and construct a quiz
        const audioPath = path.join(__dirname, '..', 'public/audio/categories/', categoryNum, category, subCategory);
        const imagePath = path.join(__dirname, '..', 'public/images/categories/', categoryNum, category, subCategory);

        const publicImagePath = '/images/categories/' + categoryNum + '/' + category + '/' + subCategory;
        const publicAudioPath = '/audio/categories/' + categoryNum + '/' + category + '/' + subCategory;

        // var audioFiles = fs.readdirSync(audioPath);
        const imageFiles = fs.readdirSync(imagePath);
        const audioFiles = fs.readdirSync(audioPath);

        const jsonData = {testing: "test success"};
        jsonData.quiz = [];

        const allWords = {};
        const wordList = [];

        //add links to the image corresponding to each word
        imageFiles.forEach(function(wordImage) {
            const word = wordImage.split('.')[0];
            wordList.push(word);

            let wordObj = {};

            if (word in allWords) {
                wordObj = allWords[word];
            } 

            wordObj['imagePath'] = publicImagePath + '/' + wordImage;
            allWords[word] = wordObj; 
        });

        //add links to the audio file corresponding to each word
        audioFiles.forEach(function(wordAudio) {
            const word = wordAudio.split('.')[0];

            let wordObj = {};

            if (word in allWords) {
                wordObj = allWords[word];
                
            } 
            wordObj['audioPath'] = publicAudioPath + '/' + wordAudio;
            allWords[word] = wordObj; 
        });

        //set remain words to be a shallow copy of wordList
        const remainingWords = wordList.slice();

        //randomly generate 5 quiz questions
        for(let i = 0; i < 5 && i < wordList.length; i++) {
            const quizObj = {};

            const correctWordIndex = Math.floor(Math.random() * remainingWords.length);
            const correctWord = remainingWords[correctWordIndex]; //randomly chooses a word for the question
            remainingWords.splice(correctWordIndex, 1); //remove the word from remaining words

            quizObj.word = textCleanup(correctWord);
            quizObj.answerImage = allWords[correctWord].imagePath;
            quizObj.answerAudio = allWords[correctWord].audioPath;

            const incorrectImages = [];
            const allOtherWords = wordList.slice(); //makes shallow copy of wordList
            allOtherWords.splice(allOtherWords.indexOf(correctWord), 1);

            //randomly chooses 3 other words as incorrect options
            for (let j = 0; j < 3 && j < wordList.length - 1; j++) {
                // randomly select incorrect word options
                const wrongWordIndex = Math.floor(Math.random() * allOtherWords.length);
                const wrongWord = allOtherWords[wrongWordIndex];
                allOtherWords.splice(wrongWordIndex, 1); 

                incorrectImages.push(allWords[wrongWord].imagePath);
            }

            quizObj.incorrectImages = incorrectImages;
            jsonData.quiz.push(quizObj);

        }

        res.render('quiz', { 
            title: "Quiz",
            encodedJson : encodeURIComponent(JSON.stringify(jsonData)),
            layout: 'quizLayout.hbs',
            subCategoryLocation: '/category/' + categoryNum + '/' + category + '/' + subCategory
        });
    } catch(error) {
        console.log(error);
        // TODO: figure out the correct way to handle this
        const err = new Error('Subcategory does not exist!');
        err.status = 404;
        return next(err);
    }
});

module.exports = router;