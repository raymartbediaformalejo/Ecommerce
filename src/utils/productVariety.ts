import * as MOCKED_RESPONSE from "../json/openfashion.json";
import { TProductVariety } from "../types/TProducts";

export const productVariety = (): TProductVariety[] => {
  const stringified = JSON.stringify(MOCKED_RESPONSE);

  const varietyArray: TProductVariety[] = JSON.parse(stringified);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return varietyArray.default;
};
