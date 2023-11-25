export default class RecordManager {
    addRecord(savedUsername, score) {
        const records = JSON.parse(localStorage.getItem('records')) || [];
        records.push({ name, score });
        records.sort((a, b) => b.score - a.score);
        if (records.length > 3) {
            records.pop();
        }

        localStorage.setItem('records', JSON.stringify(records));

    }
}