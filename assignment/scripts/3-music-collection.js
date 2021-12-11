console.log('***** Music Collection *****')

let collection = [];

function addToCollection (title, artist, yearPublished, tracks) {
    let album = {title: title, artist: artist, yearPublished: yearPublished, tracks: tracks};
    collection.push(album);
    return album;
}

// Not technically part of the requirements, but seems like this might make things cleaner later.
function bulkAddToCollection (arr) {
    for (const album of arr) {
        addToCollection(album.title, album.artist, album.yearPublished, album.tracks);
    }
}

function showCollection (arr) {
    console.log(`Albums:`, arr.length);
    for (const album of arr) {
        console.log(`${album.title} by ${album.artist}, published in ${album.yearPublished}`);
        showTracks(album.tracks);
    }
}

function showTracks (tracks) {
    for (let i = 0; i < tracks.length; i++) {
        console.log(`\t${i}. ${tracks[i].name}: ${tracks[i].duration}`);
    }
}

function findByArtist (artist) {
    return collection.filter(album => album.artist === artist);
}

function search (criteria) {
    const results = [];
    for (const album of collection) {
        if (albumMatch(criteria, album)) {
            results.push(album);
        }
    }
    return results;
}

// Alright, track match really made this matching function less elegant. 
// This used to be isMatch, I'm renaming this to albumMatch and will give the weird recursive version a try later
function albumMatch (criteria, candidate) {
    let match = true;
    for (const property in criteria) {
        if (property === 'trackName') {             // Really hate this one-off...
            if (!trackMatch(criteria[property], candidate.tracks)) {
                match = false;
            }
        }
        else if (candidate[property] !== criteria[property]) {
            match = false;
        }
    }
    return match;
}

// This is the fallback option in case the recursive thing gets too confusing.
// Update- it got too confusing. Going from a logical AND search to a logical OR made the thing way uglier than just having this one-off function.
function trackMatch (track, trackList) {
    let isMatch = false;
    for (const candidate of trackList) {
        if (track === candidate.name) {
            isMatch = true;
        }
    }
    return isMatch;
}

console.log('--- TESTS ---');
console.log(`Empty collection:`, collection);
//This bulk add might have been a mistake, this got gnarly looking
console.log(`Adding a bunch of albums:`, bulkAddToCollection([{title: 'OK Computer', artist: 'Radiohead', yearPublished: 1997, tracks:[
                                                                {name: 'Airbag', duration: '4:47'},
                                                                {name: 'Paranoid Android', duration: '6:27'},
                                                                {name: 'Subterranean Homesick Alien', duration: '4:27'},
                                                                {name: 'Exit Music (For A Film)', duration: '4:27'}
                                                            ]}, 
                                                              {title: 'Kid A', artist: 'Radiohead', yearPublished: 2000, tracks:[
                                                                {name: 'Everything In Its Right Place', duration: '4:41'},
                                                                {name: 'Kid A', duration: '4:44'},
                                                                {name: 'The National Anthem', duration: '5:51'},
                                                                {name: 'How to Disappear Completely', duration: '5:56'}
                                                            ]},
                                                              {title: 'In Rainbows', artist: 'Radiohead', yearPublished: 2007, tracks:[
                                                                {name: '15 Step', duration: '1:00'},
                                                                {name: 'Bodysnatchers', duration: '2:00'},
                                                                {name: 'Nude', duration: '3:00'}
                                                            ]},
                                                              {title: 'A Brief Inquiry Into Online Relationships', artist: 'The 1975', yearPublished: 2018, tracks:[
                                                                {name: 'The 1975', duration: '1:00'},
                                                                {name: 'Give Yourself A Try', duration: '2:00'},
                                                            ]},
                                                            {title: 'The 1975', artist: 'The 1975', yearPublished: 2013, tracks:[
                                                                {name: 'The 1975', duration: '1:00'},
                                                                {name: 'The City', duration: '2:00'},
                                                            ]},
                                                              {title: 'Cosmogramma', artist: 'Flying Lotus', yearPublished: 2010, tracks:[
                                                                {name: 'Clock Catcher', duration: '1:00'},
                                                                {name: 'Pickled!', duration: '2:00'},
                                                                {name: 'Nose Art', duration: '3:00'}
                                                            ]},
                                                              {title: 'Currents', artist: 'Tame Impala', yearPublished: 2015, tracks:[
                                                                {name: 'Let It Happen', duration: '1:00'},
                                                                {name: 'Nangs', duration: '2:00'},
                                                                {name: 'The Moment', duration: '3:00'}
                                                            ]},
                                                              {title: 'Microcastle', artist: 'Deerhunter', yearPublished: 2008, tracks:[
                                                                {name: 'foo', duration: '1:00'},
                                                                {name: 'bar', duration: '2:00'},
                                                                {name: 'something else', duration: '3:00'}
                                                            ]},
                                                              {title: 'Weird Era Cont', artist: 'Deerhunter', yearPublished: 2008, tracks:[
                                                                {name: 'foo', duration: '1:00'},
                                                                {name: 'bar', duration: '2:00'},
                                                                {name: 'something else', duration: '3:00'}
                                                            ]}]));
console.log(`Collection should contain albums now:`, collection);
console.log(`Testing showCollection`, showCollection(collection));
console.log(`---- Find By Artist ----`);
console.log(`Testing findByArtist on an artist not in collection`, findByArtist('Elvis'));
console.log(`Testing findByArtist on an artist with one album in collection`, findByArtist('Tame Impala'));
console.log(`Testing findByArtist on an artist with multiple albums in collection`, findByArtist('Radiohead'));
console.log(`---- Search ----`);
console.log(`Testing search with no search object, should return all albums`, search());
console.log(`Testing empty search, should return all albums`, search({}));
console.log(`Testing search not matching anything in library - return []`, search({album: 'asdf', artist: 'zxcv'}));
console.log(`Testing search that does not match all properties - return []`, search({artist: 'Flying Lotus', yearPublished: 1900}));
console.log(`Testing search with an exact match: return one album`, search({title: 'Weird Era Cont', artist: 'Deerhunter'}));
console.log(`Testing search that matches multiple albums - return multiple albums`, search({artist: 'Deerhunter', yearPublished: 2008}));
console.log(`---- Tracks Search ----`);
console.log(`Testing track search with no matches: return nothing`, search({trackName: 'qwerioajsdf'}));
console.log(`Testing track search with an exact match: return one album`, search({trackName: 'Airbag'}));
console.log(`Testing track search with multiple matches: return two albums`, search({trackName: 'The 1975'}));
console.log(`Bringing it all together: return one album`, search({artist: 'Radiohead', trackName: 'Subterranean Homesick Alien'}));
