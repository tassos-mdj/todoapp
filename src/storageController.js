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

    let index;
    

    return {
     
    storageInit() {
      if (index) {
        console.log('Storage already initiated : ', index);
      } else {
        index = [null];
        this.toStorage('index', index);
        console.log('Storage initiated');
      }
      return index;
    },
    

    toStorage(item, value) {
      storageAvailable("localStorage") ? storage.setItem(item, value) : console.log("Storage availability error");
    },

    fromStorage(item) {
      let result
      storageAvailable("localStorage") ? result = storage.getItem(item) : console.log("Storage availability error");
      return result;
    },

    updateIndex(value) {
      this.storageInit();
      if (value) {
        let indexUpdate = JSON.stringify(value);
        toStorage('index', indexUpdate);
        return value;
      } else {
          
          return JSON.parse(this.fromStorage('index'));
      }

    },

    getUserLoginStatus() {
      if (!this.fromStorage('userLoginStatus')) {
         return false;
      } else {
        return this.fromStorage('userLoginStatus');
      }
    },

    setUserLoginStatus(currUser, currStatus) {
      this.toStorage('userLoginStatus', JSON.stringify({user: currUser, status: currStatus}));
    },
    };
  }

 

      
