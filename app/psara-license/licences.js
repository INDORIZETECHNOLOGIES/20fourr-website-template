/* ============================================================
   PSARA licence counts by state, as the national portal shows them
   ------------------------------------------------------------
   Read from the "State/UT wise PSARA Licence Status" table on
   psara.gov.in (Ministry of Home Affairs) on READ_DATE. The portal
   recomputes these daily; re-read them when the page is reviewed.

   `active: null` is a blank cell on the portal, not a zero: on the
   read date West Bengal and Mizoram showed no active count, and
   West Bengal had shown all 741 licences active on 8 October. The
   page says "not shown" rather than inventing a number.

   Ladakh appears twice on the portal (3 issued, then a second row of
   zeros) and Lakshadweep has none; both are left out.
   ============================================================ */

export const READ_DATE = '17 October 2026';

export const PORTAL = 'https://psara.gov.in';

export const NATIONAL = { issued: 57922, active: 31256, expired: 26666 };

export const STATE_LICENCES = [
  { state: 'Maharashtra', issued: 9348, active: 5603, expired: 3745 },
  { state: 'Gujarat', issued: 8367, active: 3795, expired: 4572 },
  { state: 'Uttar Pradesh', issued: 5420, active: 3621, expired: 1799 },
  { state: 'Karnataka', issued: 4784, active: 1728, expired: 3056 },
  { state: 'Rajasthan', issued: 4511, active: 2386, expired: 2125 },
  { state: 'Haryana', issued: 3055, active: 1604, expired: 1451 },
  { state: 'Punjab', issued: 2601, active: 1109, expired: 1492 },
  { state: 'Delhi', issued: 2552, active: 1283, expired: 1269 },
  { state: 'Tamil Nadu', issued: 2327, active: 1086, expired: 1241 },
  { state: 'Madhya Pradesh', issued: 2105, active: 1788, expired: 317 },
  { state: 'Telangana', issued: 1490, active: 950, expired: 540 },
  { state: 'Kerala', issued: 1446, active: 560, expired: 886 },
  { state: 'Bihar', issued: 1264, active: 793, expired: 471 },
  { state: 'Andhra Pradesh', issued: 971, active: 686, expired: 285 },
  { state: 'Odisha', issued: 864, active: 853, expired: 11 },
  { state: 'Uttarakhand', issued: 823, active: 428, expired: 395 },
  { state: 'Himachal Pradesh', issued: 803, active: 394, expired: 409 },
  { state: 'Assam', issued: 783, active: 401, expired: 382 },
  { state: 'Chhattisgarh', issued: 744, active: 577, expired: 167 },
  { state: 'West Bengal', issued: 741, active: null, expired: 741 },
  { state: 'Jharkhand', issued: 678, active: 399, expired: 279 },
  { state: 'Chandigarh', issued: 435, active: 188, expired: 247 },
  { state: 'Dadra & Nagar Haveli and Daman & Diu', issued: 416, active: 199, expired: 217 },
  { state: 'Goa', issued: 361, active: 202, expired: 159 },
  { state: 'Puducherry', issued: 288, active: 120, expired: 168 },
  { state: 'Jammu and Kashmir', issued: 194, active: 193, expired: 1 },
  { state: 'Tripura', issued: 161, active: 88, expired: 73 },
  { state: 'Andaman & Nicobar', issued: 115, active: 47, expired: 68 },
  { state: 'Meghalaya', issued: 86, active: 36, expired: 50 },
  { state: 'Arunachal Pradesh', issued: 49, active: 42, expired: 7 },
  { state: 'Manipur', issued: 41, active: 38, expired: 3 },
  { state: 'Sikkim', issued: 40, active: 31, expired: 9 },
  { state: 'Nagaland', issued: 33, active: 25, expired: 8 },
  { state: 'Mizoram', issued: 23, active: null, expired: 23 },
  { state: 'Ladakh', issued: 3, active: 3, expired: 0 },
];

/** Indian digit grouping, the way the portal and Indian readers write numbers. */
export const fmt = (n) => n.toLocaleString('en-IN');

/** Share of issued licences that have expired, as a whole percent. */
export const expiredShare = ({ issued, expired }) => Math.round((expired / issued) * 100);
