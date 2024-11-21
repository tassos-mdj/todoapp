
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

    export function toStorage(item, value) {
      storageAvailable("localStorage") ? storage.setItem(item, value) : console.log("Storage availability error");
    }

    export function fromStorage(item) {
      let result
      storageAvailable("localStorage") ? result = storage.getItem(item) : console.log("Storage availability error");
      return result;
    }


      
