//User object that stores local information grabbed from database
export class UserInfo {
    isAnonymous: boolean;
    email: string;
    displayName: string;
    photoURL?: string;
    providerId: string;
    uid: string;
    isActive: boolean;
	emailVerified: boolean;
}
