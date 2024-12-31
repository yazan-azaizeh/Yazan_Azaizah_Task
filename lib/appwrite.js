import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';
export const appwriteConfig ={
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.yazan.riadah',
    projectId: '6771962500263fd6b2a0',
    databaseId: '67719edb001977008af3',
    userCollectionId: '67719f1b0032406f8805',
    sesstionCollectionId: '6771acae0037ba1ee032',
    storageId: '6771b03e00135a4755fb'
}



const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) 
    .setProject(appwriteConfig.projectId) 
    .setPlatform(appwriteConfig.platform) 

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email,password,username) => {
    try{
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if(!newAccount) throw Error;
        const avatarUrl = avatars.getInitials(username)

        await signIn(email,password);
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )
        return newUser;
    }
    catch (error){
        console.log("sign Up");
        console.log(error);
        throw new Error(error);
    }
}

export const signIn = async (email, password) =>{
    try{
        const session = await account.createEmailPasswordSession(email,password)
        return session;
    }
    catch (error){
        console.log("sign in");
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        console.log("getCurrentUser");
        if(!currentUser) throw Error;
        
        return currentUser.documents[0];
    }
    catch(error){
        
        console.log(error);
    }
}

export const getAllPosts = async () => {
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.sesstionCollectionId,
        [Query.orderDesc("$createdAt")]
      );
  
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
}

export const getLatestPosts = async () => {
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.sesstionCollectionId,
        [Query.orderDesc("$createdAt"), Query.limit(7)]
      );
  
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
}

export const searchPosts = async (query) => {
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.sesstionCollectionId,
        [Query.search("title", query)]
      );
  
      if (!posts) throw new Error("Something went wrong");
  
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
}

export const getUserPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.sesstionCollectionId,
      [Query.equal('athlete', userId),Query.orderDesc("$createdAt")]
    );

    if (!posts) throw new Error("Something went wrong");

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}


export const createWorkout = async (form) => {
  try {
    const [imageUrl] = await Promise.all([
      uploadFile(form.image, "image"),
    ]);

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.sesstionCollectionId,
      ID.unique(),
      {
        title: form.title,
        note: form.note,
        athlete: form.userId,
        image: imageUrl,
      }
    );
    return newPost;
  } catch (error) {
    console.error("Error creating workout:", error);
    throw new Error("Unable to create workout. Please try again.");
  }
}

export const uploadFile = async (file, type) => {
  if (!file) return;

  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  }


  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset
    );
    

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}


export const getFilePreview = async (fileId, type) => {
  let fileUrl;

  try {
    if (type === "image") {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}


