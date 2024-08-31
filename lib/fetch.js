import AsyncStorage from "@react-native-async-storage/async-storage";
import {router} from "expo-router";
import {Alert} from "react-native";

export const getFriendList = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw Error("User is not authorized");

    const response = await fetch("http://10.0.2.2:8080/friend/allfriends", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    console.log(data);
    return data.data;
}

export const getUser = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw Error("User is not authorized");

    const response = await fetch('http://10.0.2.2:8080/user/me', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();
    return data;
};

export const getAllUserRequests = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw Error("User is not authorized");

    const response = await fetch("http://10.0.2.2:8080/friend/allrequests", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    console.log(data);
    return data.data;
};

export const getAllGroupRequests = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw Error("User is not authorized");

    const response = await fetch("http://10.0.2.2:8080/groop/allrequests", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    console.log(data);
    return data;
}

export const getGroupList = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw Error("User is not authorized");

    const response = await fetch("http://10.0.2.2:8080/groop/allgroups", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();
    console.log(data);
    return data;
}

export const handleLogout = async (updateIsLoggedIn) => {
    await AsyncStorage.removeItem('token');
    updateIsLoggedIn(false);
    router.push('/');
}

export const handleSignIn = async (form, updateIsLoggedIn) => {
    const response = await fetch("http://10.0.2.2:8080/api/login", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await response.json();
    console.log(data);

    if (data.token) {
        await AsyncStorage.setItem("token", data.token);
        updateIsLoggedIn(true);
        router.push("/home");
    }
}

export const handleSignUp = async (form, updateIsLoggedIn) => {
    const response = await fetch("http://10.0.2.2:8080/api/register", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();
    console.log(data);

    if (data.token) {
        await AsyncStorage.setItem("token", data.token);
        updateIsLoggedIn(true);
        router.push("/home");
    }
}

export const handleAddFriend = async (username) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw Error("User is not authorized");

    const response = await fetch("http://10.0.2.2:8080/friend/request", {
        method: "POST",
        body: JSON.stringify({username: username}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    console.log(data);

    if (response.ok)
        Alert.alert("Success", `User ${username} has received request for friendship`);
    else
        Alert.alert("Fail", data.message);
};

export const handleUserApprove = async (requestId) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw Error("User is not authorized");

    const response = await fetch("http://10.0.2.2:8080/friend/approve", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({requestId: requestId}),
    });
    const data = await response.json();

    console.log(data);
    Alert.alert("Success", data.message);
};

export const handleUserDecline = async (requestId) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw Error("User is not authorized");

    const response = await fetch("http://10.0.2.2:8080/friend/reject", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({requestId: requestId}),
    });
    const data = await response.json();

    console.log(data);
    Alert.alert("Success", data.message);
};

export const handleCreateGroup = async (groupName) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw Error("User is not authorized");
    console.log(groupName);
    const response = await fetch("http://10.0.2.2:8080/groop/createRoom", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({name: groupName}),
    });
    const data = await response.json();

    console.log(data);
    Alert.alert("Success", data.message);
}

export const handleAddUser = async (requestId) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw Error("User is not authorized");

    const response = await fetch("http://10.0.2.2:8080/groop/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({requestId: requestId}),
    });
    const data = await response.json();

    console.log(data);
    Alert.alert("Success", data.message);
}

const handleAddGroup = async () => {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
        return;
    }

    try {

        const response = await fetch("http://10.0.2.2:8080/group/add", {
            method: "POST",
            body: JSON.stringify({username: newGroup}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();

        console.log(response);
        console.log(data);
        Alert.alert("Success", `User ${newGroup} has received request for groupship`);
    } catch (e) {
        console.log(e);
        Alert.alert("Error", e);
    }
};

const handleApprove = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {return;}

    try {
        const response = await fetch("http://10.0.2.2:8080/group/approve", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({groupId: groupId}),
        });
        const data = await response.json();

        console.log(response);
        console.log(data);
        Alert.alert("Success", data);
        await GetGroupsList();

    } catch (e) {
        console.log(e);
        Alert.alert("Error", e);
    }
};
const handleDecline = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {return;}

    try {
        const response = await fetch("http://10.0.2.2:8080/group/reject", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({groupId: groupId}),
        });
        const data = await response.json();

        console.log(response);
        console.log(data);
        Alert.alert("Success", data);
        await getAllGroups();
    } catch (e) {
        console.log(e);
        Alert.alert("Error", e);
    }
};
