
const chunkArrayInGroups = (array, size) => {
    return array.reduce(function (r, a, i) {
        var p = Math.floor(i / size);
        r[p] = r[p] || [];
        r[p].push(a);
        return r;
    }, []);
}

export default chunkArrayInGroups;