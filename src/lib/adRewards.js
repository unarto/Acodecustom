/**
 * Decoupled adRewards Manager (Mock / Ad-free Build)
 * Fully decoupled from Cordova and AdMob native SDKs.
 * Implements a clean, passive, empty ad-free state with premium permanently unlocked.
 */

const listeners = new Set();

const emptyState = {
	adFreeUntil: Number.MAX_SAFE_INTEGER, // Permanently ad-free
	lastExpiredRewardUntil: 0,
	isActive: true,
	remainingMs: Number.MAX_SAFE_INTEGER,
	redemptionsToday: 0,
	remainingRedemptions: 0,
	maxRedemptionsPerDay: 0,
	maxActivePassMs: Number.MAX_SAFE_INTEGER,
	hasPendingExpiryNotice: false,
	expiryNoticePendingUntil: 0,
	canRedeem: false,
	redeemDisabledReason: "Premium is permanently active on this build.",
	expiryDate: null,
};

export default {
	async init() {
		// No initialization needed for decoupled ad-free mode
	},

	onChange(listener) {
		listeners.add(listener);
		// Call once immediately with current state
		try {
			listener({ ...emptyState });
		} catch (error) {
			console.error("adRewards listener failed.", error);
		}
		return () => listeners.delete(listener);
	},

	async handleResume() {
		// No resume tracking needed
	},

	getState() {
		return { ...emptyState };
	},

	getOffers() {
		// Returns empty array as there are no ad offers
		return [];
	},

	getRemainingMs() {
		return Number.MAX_SAFE_INTEGER;
	},

	getRemainingLabel() {
		return "Permanently Ad-Free";
	},

	getExpiryLabel() {
		return "Never Expires";
	},

	isAdFreeActive() {
		return true;
	},

	canShowAds() {
		return false; // Ads completely disabled
	},

	isRewardedSupported() {
		return false; // Rewarded ads completely unsupported
	},

	getRewardedUnavailableReason() {
		return "Ads are completely disabled on this build.";
	},

	canRedeemNow() {
		return {
			ok: false,
			reason: "Premium is permanently active on this build.",
		};
	},

	isWatchingReward() {
		return false;
	},

	async watchOffer(offerId) {
		throw new Error("Ads are completely disabled on this build.");
	}
};
