type User = {
    title: string;
    category: string;
    imageUrl: string | undefined;
    _id: string;
    email: string
    username: string;
    name: string;
    password: string;
    phoneNumber: string
    department: string;
    role: string;
    permissions: string[];
    profilePicture: string;
    createdAt: string,
    updatedAt: string
  }

export default User;