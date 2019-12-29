function s(min,max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

for (let i =0;i<100;i++) {
    console.log(s(1,5));
}
