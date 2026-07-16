import config from "./config";

export let adUnitIdBanner = "";
export let adUnitIdInterstitial = "";
export let adUnitIdRewarded = "";
export let initialized = false;

/** @type {import("plugins/admob/src/www").BannerAd} */
export let bannerAd = null;
/** @type {import("plugins/admob/src/www").InterstitialAd} */
export let interstitialAd = null;

export default async function startAd() {
	// Decoupled Ads Deactivation: Return immediately to prevent AdMob SDK loading or initializing
	return;
}

/**
 * Hides the ad
 * @param {Boolean} [force=false]
 */
export function hideAd(force = false) {
	// Decoupled Ads Deactivation: Return immediately
	return;
}
