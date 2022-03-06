class PlaylistRowMapper {
    fromPlaylistItemRow(item) {
        return {
            position: Number(item.position),
            songId: item.song_id,
            title: item.title,
            artist: item.artist,
            source: item.source,
            filename: item.filename,
        };
    }

    toInsertParams(song) {
        return {
            title: song.title,
            artist: song.artist,
            source: song.source,
        };
    }

    toUpdateParams() {
        return {};
    }
}

export default new PlaylistRowMapper();
