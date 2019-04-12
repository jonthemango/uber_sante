
function avail(type){
    const all =  {
        "availability": {
                    "monday": {
                        "0": true,
                        "1": true,
                        "2": true,
                        "3": true,
                        "4": true,
                        "5": true,
                        "6": true,
                        "7": true,
                        "8": true,
                        "9": true,
                        "10": true,
                        "11": true,
                        "12": true,
                        "13": true,
                        "14": true,
                        "15": true,
                        "16": true,
                        "17": true,
                        "18": true,
                        "19": true,
                        "20": true,
                        "21": true,
                        "22": true,
                        "23": true,
                        "24": true,
                        "25": true,
                        "26": true,
                        "27": true,
                        "28": true,
                        "29": true,
                        "30": true,
                        "31": true,
                        "32": true,
                        "33": true,
                        "34": true,
                        "35": true
                    },
                    "tuesday": {
                        "0": true,
                        "1": true,
                        "2": true,
                        "3": true,
                        "4": true,
                        "5": true,
                        "6": true,
                        "7": true,
                        "8": true,
                        "9": true,
                        "10": true,
                        "11": true,
                        "12": true,
                        "13": true,
                        "14": true,
                        "15": true,
                        "16": true,
                        "17": true,
                        "18": true,
                        "19": true,
                        "20": true,
                        "21": true,
                        "22": true,
                        "23": true,
                        "24": true,
                        "25": true,
                        "26": true,
                        "27": true,
                        "28": true,
                        "29": true,
                        "30": true,
                        "31": true,
                        "32": true,
                        "33": true,
                        "34": true,
                        "35": true
                    },
                    "wednesday": {
                        "0": true,
                        "1": true,
                        "2": true,
                        "3": true,
                        "4": true,
                        "5": true,
                        "6": true,
                        "7": true,
                        "8": true,
                        "9": true,
                        "10": true,
                        "11": true,
                        "12": true,
                        "13": true,
                        "14": true,
                        "15": true,
                        "16": true,
                        "17": true,
                        "18": true,
                        "19": true,
                        "20": true,
                        "21": true,
                        "22": true,
                        "23": true,
                        "24": true,
                        "25": true,
                        "26": true,
                        "27": true,
                        "28": true,
                        "29": true,
                        "30": true,
                        "31": true,
                        "32": true,
                        "33": true,
                        "34": true,
                        "35": true
                    },
                    "thursday": {
                        "0": true,
                        "1": true,
                        "2": true,
                        "3": true,
                        "4": true,
                        "5": true,
                        "6": true,
                        "7": true,
                        "8": true,
                        "9": true,
                        "10": true,
                        "11": true,
                        "12": true,
                        "13": true,
                        "14": true,
                        "15": true,
                        "16": true,
                        "17": true,
                        "18": true,
                        "19": true,
                        "20": true,
                        "21": true,
                        "22": true,
                        "23": true,
                        "24": true,
                        "25": true,
                        "26": true,
                        "27": true,
                        "28": true,
                        "29": true,
                        "30": true,
                        "31": true,
                        "32": true,
                        "33": true,
                        "34": true,
                        "35": true
                    },
                    "friday": {
                        "0": true,
                        "1": true,
                        "2": true,
                        "3": true,
                        "4": true,
                        "5": true,
                        "6": true,
                        "7": true,
                        "8": true,
                        "9": true,
                        "10": true,
                        "11": true,
                        "12": true,
                        "13": true,
                        "14": true,
                        "15": true,
                        "16": true,
                        "17": true,
                        "18": true,
                        "19": true,
                        "20": true,
                        "21": true,
                        "22": true,
                        "23": true,
                        "24": true,
                        "25": true,
                        "26": true,
                        "27": true,
                        "28": true,
                        "29": true,
                        "30": true,
                        "31": true,
                        "32": true,
                        "33": true,
                        "34": true,
                        "35": true
                    }
                }
    }

    const none = {
        "availability":{

        }
    }

    const nineToFive = {
        "availability":{
            "availability": {
                "monday": {
                    "3": true,
                    "4": true,
                    "5": true,
                    "6": true,
                    "7": true,
                    "8": true,
                    "9": true,
                    "10": true,
                    "11": true,
                    "12": true,
                    "13": true,
                    "14": true,
                    "15": true,
                    "16": true,
                    "17": true,
                    "18": true,
                    "19": true,
                    "20": true,
                    "21": true,
                    "22": true,
                    "23": true,
                    "24": true,
                    "25": true,
                    "26": true,
                    "27": true,
                    "28": true,
                    "29": true,
                    "30": true,
                    "31": true,
                    "32": true,
                    "33": true
                },
                "tuesday": {
                    "3": true,
                    "4": true,
                    "5": true,
                    "6": true,
                    "7": true,
                    "8": true,
                    "9": true,
                    "10": true,
                    "11": true,
                    "12": true,
                    "13": true,
                    "14": true,
                    "15": true,
                    "16": true,
                    "17": true,
                    "18": true,
                    "19": true,
                    "20": true,
                    "21": true,
                    "22": true,
                    "23": true,
                    "24": true,
                    "25": true,
                    "26": true,
                    "27": true,
                    "28": true,
                    "29": true,
                    "30": true,
                    "31": true,
                    "32": true,
                    "33": true
                },
                "wednesday": {
                    "3": true,
                    "4": true,
                    "5": true,
                    "6": true,
                    "7": true,
                    "8": true,
                    "9": true,
                    "10": true,
                    "11": true,
                    "12": true,
                    "13": true,
                    "14": true,
                    "15": true,
                    "16": true,
                    "17": true,
                    "18": true,
                    "19": true,
                    "20": true,
                    "21": true,
                    "22": true,
                    "23": true,
                    "24": true,
                    "25": true,
                    "26": true,
                    "27": true,
                    "28": true,
                    "29": true,
                    "30": true,
                    "31": true,
                    "32": true,
                    "33": true
                },
                "thursday": {
                    "3": true,
                    "4": true,
                    "5": true,
                    "6": true,
                    "7": true,
                    "8": true,
                    "9": true,
                    "10": true,
                    "11": true,
                    "12": true,
                    "13": true,
                    "14": true,
                    "15": true,
                    "16": true,
                    "17": true,
                    "18": true,
                    "19": true,
                    "20": true,
                    "21": true,
                    "22": true,
                    "23": true,
                    "24": true,
                    "25": true,
                    "26": true,
                    "27": true,
                    "28": true,
                    "29": true,
                    "30": true,
                    "31": true,
                    "32": true,
                    "33": true
                },
                "friday": {
                    "3": true,
                    "4": true,
                    "5": true,
                    "6": true,
                    "7": true,
                    "8": true,
                    "9": true,
                    "10": true,
                    "11": true,
                    "12": true,
                    "13": true,
                    "14": true,
                    "15": true,
                    "16": true,
                    "17": true,
                    "18": true,
                    "19": true,
                    "20": true,
                    "21": true,
                    "22": true,
                    "23": true,
                    "24": true,
                    "25": true,
                    "26": true,
                    "27": true,
                    "28": true,
                    "29": true,
                    "30": true,
                    "31": true,
                    "32": true,
                    "33": true
                }
            }
        }
    }

    if (type == "all"){
        return all
    } else if (type="nineToFive"){
        return nineToFive;
    } else {
        return none;
    } 
}



export default avail;