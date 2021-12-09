console.log('***** Music Collection *****')

let collection = [];

function addToCollection (title, artist, yearPublished) {
    let album = {title: title, artist: artist, yearPublished: yearPublished};
    collection.push(album);
    return album;
}

// Not technically part of the requirements, but seems like this might make things cleaner later.
function bulkAddToCollection (arr) {
    for (album of arr) {
        addToCollection(album.title, album.artist, album.yearPublished);
    }
}

function showCollection (arr) {
    console.log(`Albums:`, arr.length);
    for (album of arr) {
        console.log(`${album.title} by ${album.artist}, published in ${album.yearPublished}`);
    }
}

function findByArtist (artist) {
    return collection.filter(album => album.artist === artist);
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