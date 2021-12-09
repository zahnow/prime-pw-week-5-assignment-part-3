console.log('***** Music Collection *****')

let collection = [];

function addToCollection (title, artist, yearPublished) {
    let album = {title: title, artist: artist, yearPublished: yearPublished};
    collection.push(album);
    return album;
}

function bulkAddToCollection (arr) {
    for (album of arr) {
        addToCollection(album.title, album.artist, album.yearPublished);
    }
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