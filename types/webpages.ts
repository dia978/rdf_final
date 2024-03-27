export type About = {
    title: string;
    sliderPhotos: string[];
    whoWeAre: {
        title: string;
        description: string;
        videoUrl: string;
        photoUrl: string;
    };
    welcomeNote: {
        title: string;
        professorName: string;
        professorPosition: string;
        professorPhotoUrl: string;
        note: string;
        readMoreSlug: string;
    };
    sectionsBackgroundImageSrc: string;
    sections: {
        iconSrc: string;
        title: string;
        viewMoreSlug: string;
        viewMoreLabel: string;
    }[];
    alumniSectionTitle: string;
    operationalCountriesTitle: string;
    operationalCountries: string[];
    partnerUniversitiesTitle: string;
    partnerUniversities: string[];
    achievementsTitle: string;
    achievements: string[];
};

export type Admissions = {
    bannerImageUrl: string;
    bannerTitle: string;
    enrollementSection: {
        title: string;
        description: string;
        imageUrls: string[];
        formUrl: string;
    };
    missionSection: {
        title: string;
        description: string;
        imageUrls: string[];
        formUrl: string;
    };
    firstCharacterSection: {
        title: string;
        description: string;
        imageUrls: string[];
        formUrl: string;
    };
    secondCharacterSection: {
        title: string;
        description: string;
        imageUrls: string[];
        formUrl: string;
    };
    lastCharacterSection: {
        title: string;
        description: string;
        // description1: string;
        imageUrls: string[];
        formUrl: string;
    };
}

export type Contact = {
    email: string;
    phoneNumber: string;
    location: string;
    workingDays: {
        label: string;
        value: string;
    }[];
}

export type Landing = {
    mission: {
        text: string;
        imageUrl: string;
    };
    sections: {
        title: string;
        buttonLabel: string;
        imageUrl: string;
    }[];
    coreValues: string[];
    valuesImage: string;
    uniquenessTitle: string;
    uniqueness: {
        title: string;
        content: string;
        imageSrc: string;
    }[];
    numbers: {
        learners: number;
        nationalities: number;
        courses: number;
        educators: number;
    };
    footer: {
        label1: string;
        label2: string;
        label3: string;
    };
}

export type Education = {
    bannerImageUrl: string;
    bannerTitle: string;
    overviewTitle: string;
    overviewDescription: {
        title: string;
        description: string;
    }[];
    leanerProfile: {
        title: string;
        description: string;
        learningItems: string[];
        photosUrl: string[];
    };
    timeTable: {
        title: string;
        schedules: {
            [day: string]: {
                schedule: string;
                startTime: string;
                endTime: string;
            }[];
        };
    };
};
