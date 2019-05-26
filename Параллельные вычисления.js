function parallelComputing(syncFunctionsArr, mainFunction) {
    if (!Array.isArray(syncFunctionsArr)) {
        return;
    }

    const callback = () => console.log('Callback');

    syncFunctionsArr.forEach((syncFunction) => {
        if (typeof syncFunction === 'function') {
            syncFunction(callback);
        }
    });

    mainFunction();
}
