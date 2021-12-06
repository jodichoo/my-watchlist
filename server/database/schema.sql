DROP TABLE IF EXISTS watchlist CASCADE; 
DROP TABLE IF EXISTS watched CASCADE; 

CREATE TABLE watchlist (
    uid INTEGER, 
    did INTEGER,
    eps INTEGER DEFAULT 16, 
    PRIMARY KEY(uid, did)
);

CREATE TABLE watched (
    uid INTEGER, 
    did INTEGER,
    episode INTEGER,
    PRIMARY KEY (uid, did, episode),
    FOREIGN KEY (uid, did) REFERENCES watchlist(uid, did)
);