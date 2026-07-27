import { dayOneMeta } from "./dayOne/meta";
import { dayThreeMeta } from "./dayThree/meta";
import { dayTwoMeta } from "./dayTwo/meta";
import { dayZeroMeta } from "./dayZero/meta";
import { todayGoldPriceMeta } from "./todaygoldprice/meta";

export const designConceptsMeta = [
  dayZeroMeta,
  dayOneMeta,
  dayTwoMeta,
  dayThreeMeta,
  todayGoldPriceMeta,
] as const;
