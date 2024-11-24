    let storage;
    function storageAvailable(type) {
        
        
        try {
          storage = window[type];
          const x = "__storage_test__";
          storage.setItem(x, x);
          storage.removeItem(x);
          return true;
        } catch (e) {
          return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
          );
        }
    }

    export function Storage() {

    let idIndex;
    

    return {
     
    storageInit() {
      if (idIndex) {
        console.log('Storage already initiated : ', idIndex);
      } else {
        idIndex = [null];
        this.toStorage('idIndex', idIndex);
        console.log('Storage initiated');
      }
      return idIndex;
    },
    

    toStorage(item, value) {
      storageAvailable("localStorage") ? storage.setItem(item, value) : console.log("Storage availability error");
    },

    fromStorage(item) {
      let result
      storageAvailable("localStorage") ? result = storage.getItem(item) : console.log("Storage availability error");
      return result;
    },

    updateIdIndex(value) {
      this.storageInit();
      if (value) {
        toStorage('idIndex', value);
        return this.fromStorage('idIndex');
      } else {
          return this.fromStorage('idIndex');
      }

    },
    };
  }

 

      
