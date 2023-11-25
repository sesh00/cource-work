export default class RecordManager {
    addRecord(name, score) {
        const records = JSON.parse(localStorage.getItem('records')) || [];
        records.push({ name, score });
        records.sort((a, b) => a.score - b.score);
        if (records.length > 3) {
            records.pop();
        }

        localStorage.setItem('records', JSON.stringify(records));

    }
}