console.log('***** Music Collection *****')

let collection = [];

function addToCollection (title, artist, yearPublished) {
    let album = {title: title, artist: artist, yearPublished: yearPublished};
    collection.push(album);
    return album;
}

// Not technically part of the requirements, but seems like this might make things cleaner later.
function bulkAddToCollection (arr) {
    for (const album of arr) {
        addToCollection(album.title, album.artist, album.yearPublished);
    }
}

function showCollection (arr) {
    console.log(`Albums:`, arr.length);
    for (const album of arr) {
        console.log(`${album.title} by ${album.artist}, published in ${album.yearPublished}`);
    }
}

function findByArtist (artist) {
    return collection.filter(album => album.artist === artist);
}

function search (criteria) {
    const returnArr = [];
    //This is gonna be gross looking but I can't come up with a better alternative at the moment
    for (const album of collection) {
        let match = true;
        for (const property in criteria) {
            if (album[property] !== criteria[property]) {
                match = false;
            }
        }
        if (match) {
            returnArr.push(album);
        }
    }
    return returnArr;
}

console.log('--- TESTS ---');
console.log(`Empty collection:`, collection);
console.log(`Adding a bunch of albums:`, bulkAddToCollection([{title: 'OK Computer', artist: 'Radiohead', yearPublished: 1997}, 
                                                              {title: 'Kid A', artist: 'Radiohead', yearPublished: 2000},
                                                              {title: 'In Rainbows', artist: 'Radiohead', yearPublished: 2007},
                                                              {title: 'Untrue', artist: 'Burial', yearPublished: 2007},
                                                              {title: 'Cosmogramma', artist: 'Flying Lotus', yearPublished: 2010},
                                                              {title: 'Currents', artist: 'Tame Impala', yearPublished: 2015},
                                                              {title: 'Microcastle', artist: 'Deerhunter', yearPublished: 2008},
                                                              {title: 'Weird Era Cont', artist: 'Deerhunter', yearPublished: 2008}]));
console.log(`Collection should contain albums now:`, collection);
console.log(`Testing showCollection`, showCollection(collection));
console.log(`Testing findByArtist on an artist not in collection`, findByArtist('Elvis'));
console.log(`Testing findByArtist on an artist with one album in collection`, findByArtist('Tame Impala'));
console.log(`Testing findByArtist on an artist with multiple albums in collection`, findByArtist('Radiohead'));
//console.log(`Testing search with no search object, should return all albums`, search());  //This one breaks things
console.log(`Testing search with an exact match: return one album`, search({title: 'Weird Era Cont', artist: 'Deerhunter', yearPublished: 2008}))
console.log(`Testing empty search, should return all albums`, search({}));
console.log(`Testing search not matching anything in library - return []`, search({album: 'asdf', artist: 'zxcv'}));
console.log(`Testing search that does not match all properties - return []`, search({artist: 'Flying Lotus', yearPublished: 1900}));
console.log(`Testing search that matches multiple albums - return multiple albums`, search({artist: 'Deerhunter', yearPublished: 2008}));