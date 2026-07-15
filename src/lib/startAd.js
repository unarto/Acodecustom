import config from "./config";

export let adUnitIdBanner = "";
export let adUnitIdInterstitial = "";
export let adUnitIdRewarded = "";
export let initialized = false;

export let bannerAd = null;
export let interstitialAd = null;

export default async function startAd() {
	// Ads disabled globally
	return;
}

/**
 * Hides the ad
 * @param {Boolean} [force=false]
 */
export function hideAd(force = false) {
	// Ads disabled globally
	return;
}
