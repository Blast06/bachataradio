import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { BannerAdOptions, InterstitialAdOptions, RewardedAdOptions, AdSize, AdPosition } from 'capacitor-admob-advanced';
const { AdMobAdvanced } = Plugins;

@Injectable({
    providedIn: 'root'
})
export class AdsService {

    public bannerOptions: BannerAdOptions = {
        adIdAndroid: 'ca-app-pub-3940256099942544/6300978111',
        adIdIos: 'ca-app-pub-3940256099942544/6300978111',
        adSize: AdSize.SMART_BANNER,
        adPosition: AdPosition.BOTTOM,
        isTesting: true,
        topMargin: 0,
        bottomMargin: 0
    };

    public interstitialOptions: InterstitialAdOptions = {
        adIdAndroid: 'ca-app-pub-3940256099942544/1033173712',
        adIdIos: 'ca-app-pub-3940256099942544/1033173712',
        isTesting: true
    };

    public rewardedOptions: RewardedAdOptions = {
        adIdAndroid: 'ca-app-pub-3940256099942544/5224354917',
        adIdIos: 'ca-app-pub-3940256099942544/5224354917',
        isTesting: true
    };

    interstitialLoaded = false;
    rewardedLoaded = false;
    personalizedAds;

    constructor() { }

    public initialize() {
        AdMobAdvanced.initialize({
            appIdAndroid: 'ca-app-pub-4473546092325949~7759761019', // replace with your actual Android app ID
            appIdIos: 'ca-app-your-ios-add-id',     // replace with your actual iOS app ID
        }).then(value => {
            console.log(value);
        }, error => {
            console.error(error);
        });
    }

    public initializeWithConsent() {
        AdMobAdvanced.initializeWithConsent({
            appIdAndroid: 'ca-app-pub-4473546092325949~7759761019', // replace with your actual Android app ID
            appIdIos: 'ca-app-your-ios-add-id',     // replace with your actual iOS app ID
            publisherId: 'pub-4473546092325949',                     // replace with your actual publisher ID
        }).then(data => {
            if (data.consentStatus === 'PERSONALIZED') {
                this.personalizedAds = true;
            } else if (data.consentStatus === 'NON_PERSONALIZED') {
                this.personalizedAds = false;
            } else if (data.consentStatus === 'UNKNOWN') {
                this.showGoogleConsentForm();
            }
            console.log(data);
        }, error => {
            console.error(error);
        });
    }

    public showGoogleConsentForm() {
        AdMobAdvanced.showGoogleConsentForm({
            privacyPolicyURL: 'https://www.your.com/privacyurl', // replace with your actual privacy policy url
            showAdFreeOption: true
        }).then(data => {
            if (data.consentStatus === 'PERSONALIZED') {
                this.personalizedAds = true;
            } else if (data.consentStatus === 'NON_PERSONALIZED') {
                this.personalizedAds = false;
            } else if (data.consentStatus === 'ADFREE') {
                console.log('User wishes to pay for Ad free version');
                this.personalizedAds = false;
            } else {
                this.personalizedAds = false;
            }
        }, error => {
            console.error(error);
        });
    }

    public getAdProviders() {
        AdMobAdvanced.getAdProviders({
        }).then(data => {
            console.log(data.adProviders);
        }, error => {
            console.error(error);
        });
    }

    public updateAdExtras(conStat, chldDct, uAOC, mACR) {
        AdMobAdvanced.updateAdExtras({
            consentStatus: conStat,
            childDirected: chldDct,
            underAgeOfConsent: uAOC,
            maxAdContentRating: mACR
        }).then(data => {
            if (data.consentStatus === 'PERSONALIZED') {
                this.personalizedAds = true;
            } else {
                this.personalizedAds = false;
            }
            console.log(data);
        }, error => {
            console.error(error);
        });
    }

    public showBanner() {
        AdMobAdvanced.showBanner(this.bannerOptions).then(value => {
            console.log(value);
        }, error => {
            console.error(error);
        });
    }

    public hideBanner() {
        AdMobAdvanced.hideBanner().then(value => {
            console.log(value);
        }, error => {
            console.error(error);
        });
    }

    public resumeBanner() {
        AdMobAdvanced.resumeBanner().then(value => {
            console.log(value);
        }, error => {
            console.error(error);
        });
    }

    public removeBanner() {
        AdMobAdvanced.removeBanner().then(value => {
            console.log(value);
        }, error => {
            console.error(error);
        });
    }

    public loadInterstitial() {
        AdMobAdvanced.loadInterstitial(this.interstitialOptions).then(value => {
            console.log(value);
            this.interstitialLoaded = true;
        }, error => {
            console.error(error);
        });
    }

    public showInterstitial() {
        AdMobAdvanced.showInterstitial().then(value => {
            console.log(value);
            this.interstitialLoaded = false;
        }, error => {
            console.error(error);
        });
    }

    public loadRewarded() {
        AdMobAdvanced.loadRewarded(this.rewardedOptions).then(value => {
            console.log(value);
            this.rewardedLoaded = true;
        }, error => {
            console.error(error);
        });
    }

    public showRewarded() {
        AdMobAdvanced.showRewarded().then(value => {
            console.log(value);
            this.rewardedLoaded = false;
        }, error => {
            console.error(error);
        });
    }

    public pauseRewarded() {
        AdMobAdvanced.pauseRewarded().then(value => {
            console.log(value);
        }, error => {
            console.error(error);
        });
    }

    public resumeRewarded() {
        AdMobAdvanced.resumeRewarded().then(value => {
            console.log(value);
        }, error => {
            console.error(error);
        });
    }

    public stopRewarded() {
        AdMobAdvanced.showRewarded().then(value => {
            console.log(value);
        }, error => {
            console.error(error);
        });
    }

}