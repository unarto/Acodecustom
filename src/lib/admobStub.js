/**
 * AdMob & Consent Safe Stub Layer
 * Decouples the frontend application from Cordova's native AdMob plugin.
 * Ensures that if the native cordova-plugin-admob is missing during a native build,
 * no Javascript ReferenceErrors or uncaught crashes occur when accessing `admob` or `consent`.
 */

class DummyAd {
	constructor() {
		this.active = false;
	}
	async load() {
		return;
	}
	async show() {
		this.active = true;
		return;
	}
	async hide() {
		this.active = false;
		return;
	}
	on(event, callback) {
		// Mock event listener
	}
}

const dummyAdmob = {
	BannerAd: DummyAd,
	InterstitialAd: DummyAd,
	RewardedAd: DummyAd,
	RewardedInterstitialAd: DummyAd,
	AppOpenAd: DummyAd,
	start: async () => {
		console.info("[AdMob Stub] Safe start called.");
		return {};
	},
	configure: async (config) => {
		return {};
	}
};

const dummyConsent = {
	ConsentStatus: {
		Unknown: 0,
		NotRequired: 1,
		Required: 2,
	},
	FormStatus: {
		Unknown: 0,
		Unavailable: 1,
		Available: 2,
	},
	getConsentStatus: async () => 1, // NotRequired
	requestInfoUpdate: async () => {},
	getFormStatus: async () => 1, // Unavailable
	loadForm: async () => ({
		show: async () => {}
	})
};

// Safe injection to prevent reference errors globally
if (typeof window !== "undefined") {
	if (typeof window.admob === "undefined") {
		window.admob = dummyAdmob;
	}
	if (typeof window.consent === "undefined") {
		window.consent = dummyConsent;
	}
}

// Also define as block-scoped global fallback if referenced as free variables
if (typeof globalThis !== "undefined") {
	if (typeof globalThis.admob === "undefined") {
		globalThis.admob = dummyAdmob;
	}
	if (typeof globalThis.consent === "undefined") {
		globalThis.consent = dummyConsent;
	}
}
