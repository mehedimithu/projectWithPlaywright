import { mergeExpects, mergeTests } from "@playwright/test";
import {  test as pageTest, expect as pageExpect} from "@fixtures/pages.fixture";
import {  test as consolTest, expect as consolExpect} from "@fixtures/consol.fixture";

export const test = mergeTests(pageTest, consolTest);
export const expect = mergeExpects(pageExpect, consolExpect);