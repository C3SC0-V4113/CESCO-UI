import type { CountryCode } from 'libphonenumber-js';
import type { ComponentType, SVGProps } from 'react';

type CountryFlagModule = { default: ComponentType<SVGProps<SVGSVGElement>> };

export const countryFlagLoaders: Record<CountryCode, () => Promise<CountryFlagModule>> = {
  AC: () =>
    import('country-flag-icons/react/3x2/AC').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  AD: () =>
    import('country-flag-icons/react/3x2/AD').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  AE: () =>
    import('country-flag-icons/react/3x2/AE').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  AF: () =>
    import('country-flag-icons/react/3x2/AF').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  AG: () =>
    import('country-flag-icons/react/3x2/AG').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  AI: () =>
    import('country-flag-icons/react/3x2/AI').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  AL: () =>
    import('country-flag-icons/react/3x2/AL').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  AM: () =>
    import('country-flag-icons/react/3x2/AM').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  AO: () =>
    import('country-flag-icons/react/3x2/AO').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  AR: () =>
    import('country-flag-icons/react/3x2/AR').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  AS: () =>
    import('country-flag-icons/react/3x2/AS').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  AT: () =>
    import('country-flag-icons/react/3x2/AT').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  AU: () =>
    import('country-flag-icons/react/3x2/AU').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  AW: () =>
    import('country-flag-icons/react/3x2/AW').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  AX: () =>
    import('country-flag-icons/react/3x2/AX').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  AZ: () =>
    import('country-flag-icons/react/3x2/AZ').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  BA: () =>
    import('country-flag-icons/react/3x2/BA').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  BB: () =>
    import('country-flag-icons/react/3x2/BB').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  BD: () =>
    import('country-flag-icons/react/3x2/BD').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  BE: () =>
    import('country-flag-icons/react/3x2/BE').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  BF: () =>
    import('country-flag-icons/react/3x2/BF').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  BG: () =>
    import('country-flag-icons/react/3x2/BG').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  BH: () =>
    import('country-flag-icons/react/3x2/BH').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  BI: () =>
    import('country-flag-icons/react/3x2/BI').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  BJ: () =>
    import('country-flag-icons/react/3x2/BJ').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  BL: () =>
    import('country-flag-icons/react/3x2/BL').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  BM: () =>
    import('country-flag-icons/react/3x2/BM').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  BN: () =>
    import('country-flag-icons/react/3x2/BN').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  BO: () =>
    import('country-flag-icons/react/3x2/BO').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  BQ: () =>
    import('country-flag-icons/react/3x2/BQ').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  BR: () =>
    import('country-flag-icons/react/3x2/BR').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  BS: () =>
    import('country-flag-icons/react/3x2/BS').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  BT: () =>
    import('country-flag-icons/react/3x2/BT').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  BW: () =>
    import('country-flag-icons/react/3x2/BW').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  BY: () =>
    import('country-flag-icons/react/3x2/BY').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  BZ: () =>
    import('country-flag-icons/react/3x2/BZ').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  CA: () =>
    import('country-flag-icons/react/3x2/CA').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  CC: () =>
    import('country-flag-icons/react/3x2/CC').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  CD: () =>
    import('country-flag-icons/react/3x2/CD').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  CF: () =>
    import('country-flag-icons/react/3x2/CF').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  CG: () =>
    import('country-flag-icons/react/3x2/CG').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  CH: () =>
    import('country-flag-icons/react/3x2/CH').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  CI: () =>
    import('country-flag-icons/react/3x2/CI').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  CK: () =>
    import('country-flag-icons/react/3x2/CK').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  CL: () =>
    import('country-flag-icons/react/3x2/CL').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  CM: () =>
    import('country-flag-icons/react/3x2/CM').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  CN: () =>
    import('country-flag-icons/react/3x2/CN').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  CO: () =>
    import('country-flag-icons/react/3x2/CO').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  CR: () =>
    import('country-flag-icons/react/3x2/CR').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  CU: () =>
    import('country-flag-icons/react/3x2/CU').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  CV: () =>
    import('country-flag-icons/react/3x2/CV').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  CW: () =>
    import('country-flag-icons/react/3x2/CW').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  CX: () =>
    import('country-flag-icons/react/3x2/CX').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  CY: () =>
    import('country-flag-icons/react/3x2/CY').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  CZ: () =>
    import('country-flag-icons/react/3x2/CZ').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  DE: () =>
    import('country-flag-icons/react/3x2/DE').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  DJ: () =>
    import('country-flag-icons/react/3x2/DJ').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  DK: () =>
    import('country-flag-icons/react/3x2/DK').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  DM: () =>
    import('country-flag-icons/react/3x2/DM').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  DO: () =>
    import('country-flag-icons/react/3x2/DO').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  DZ: () =>
    import('country-flag-icons/react/3x2/DZ').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  EC: () =>
    import('country-flag-icons/react/3x2/EC').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  EE: () =>
    import('country-flag-icons/react/3x2/EE').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  EG: () =>
    import('country-flag-icons/react/3x2/EG').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  EH: () =>
    import('country-flag-icons/react/3x2/EH').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  ER: () =>
    import('country-flag-icons/react/3x2/ER').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  ES: () =>
    import('country-flag-icons/react/3x2/ES').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  ET: () =>
    import('country-flag-icons/react/3x2/ET').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  FI: () =>
    import('country-flag-icons/react/3x2/FI').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  FJ: () =>
    import('country-flag-icons/react/3x2/FJ').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  FK: () =>
    import('country-flag-icons/react/3x2/FK').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  FM: () =>
    import('country-flag-icons/react/3x2/FM').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  FO: () =>
    import('country-flag-icons/react/3x2/FO').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  FR: () =>
    import('country-flag-icons/react/3x2/FR').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  GA: () =>
    import('country-flag-icons/react/3x2/GA').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  GB: () =>
    import('country-flag-icons/react/3x2/GB').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  GD: () =>
    import('country-flag-icons/react/3x2/GD').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  GE: () =>
    import('country-flag-icons/react/3x2/GE').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  GF: () =>
    import('country-flag-icons/react/3x2/GF').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  GG: () =>
    import('country-flag-icons/react/3x2/GG').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  GH: () =>
    import('country-flag-icons/react/3x2/GH').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  GI: () =>
    import('country-flag-icons/react/3x2/GI').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  GL: () =>
    import('country-flag-icons/react/3x2/GL').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  GM: () =>
    import('country-flag-icons/react/3x2/GM').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  GN: () =>
    import('country-flag-icons/react/3x2/GN').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  GP: () =>
    import('country-flag-icons/react/3x2/GP').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  GQ: () =>
    import('country-flag-icons/react/3x2/GQ').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  GR: () =>
    import('country-flag-icons/react/3x2/GR').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  GT: () =>
    import('country-flag-icons/react/3x2/GT').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  GU: () =>
    import('country-flag-icons/react/3x2/GU').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  GW: () =>
    import('country-flag-icons/react/3x2/GW').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  GY: () =>
    import('country-flag-icons/react/3x2/GY').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  HK: () =>
    import('country-flag-icons/react/3x2/HK').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  HN: () =>
    import('country-flag-icons/react/3x2/HN').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  HR: () =>
    import('country-flag-icons/react/3x2/HR').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  HT: () =>
    import('country-flag-icons/react/3x2/HT').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  HU: () =>
    import('country-flag-icons/react/3x2/HU').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  ID: () =>
    import('country-flag-icons/react/3x2/ID').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  IE: () =>
    import('country-flag-icons/react/3x2/IE').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  IL: () =>
    import('country-flag-icons/react/3x2/IL').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  IM: () =>
    import('country-flag-icons/react/3x2/IM').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  IN: () =>
    import('country-flag-icons/react/3x2/IN').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  IO: () =>
    import('country-flag-icons/react/3x2/IO').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  IQ: () =>
    import('country-flag-icons/react/3x2/IQ').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  IR: () =>
    import('country-flag-icons/react/3x2/IR').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  IS: () =>
    import('country-flag-icons/react/3x2/IS').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  IT: () =>
    import('country-flag-icons/react/3x2/IT').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  JE: () =>
    import('country-flag-icons/react/3x2/JE').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  JM: () =>
    import('country-flag-icons/react/3x2/JM').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  JO: () =>
    import('country-flag-icons/react/3x2/JO').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  JP: () =>
    import('country-flag-icons/react/3x2/JP').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  KE: () =>
    import('country-flag-icons/react/3x2/KE').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  KG: () =>
    import('country-flag-icons/react/3x2/KG').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  KH: () =>
    import('country-flag-icons/react/3x2/KH').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  KI: () =>
    import('country-flag-icons/react/3x2/KI').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  KM: () =>
    import('country-flag-icons/react/3x2/KM').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  KN: () =>
    import('country-flag-icons/react/3x2/KN').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  KP: () =>
    import('country-flag-icons/react/3x2/KP').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  KR: () =>
    import('country-flag-icons/react/3x2/KR').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  KW: () =>
    import('country-flag-icons/react/3x2/KW').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  KY: () =>
    import('country-flag-icons/react/3x2/KY').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  KZ: () =>
    import('country-flag-icons/react/3x2/KZ').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  LA: () =>
    import('country-flag-icons/react/3x2/LA').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  LB: () =>
    import('country-flag-icons/react/3x2/LB').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  LC: () =>
    import('country-flag-icons/react/3x2/LC').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  LI: () =>
    import('country-flag-icons/react/3x2/LI').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  LK: () =>
    import('country-flag-icons/react/3x2/LK').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  LR: () =>
    import('country-flag-icons/react/3x2/LR').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  LS: () =>
    import('country-flag-icons/react/3x2/LS').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  LT: () =>
    import('country-flag-icons/react/3x2/LT').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  LU: () =>
    import('country-flag-icons/react/3x2/LU').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  LV: () =>
    import('country-flag-icons/react/3x2/LV').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  LY: () =>
    import('country-flag-icons/react/3x2/LY').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  MA: () =>
    import('country-flag-icons/react/3x2/MA').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  MC: () =>
    import('country-flag-icons/react/3x2/MC').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  MD: () =>
    import('country-flag-icons/react/3x2/MD').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  ME: () =>
    import('country-flag-icons/react/3x2/ME').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  MF: () =>
    import('country-flag-icons/react/3x2/MF').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  MG: () =>
    import('country-flag-icons/react/3x2/MG').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  MH: () =>
    import('country-flag-icons/react/3x2/MH').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  MK: () =>
    import('country-flag-icons/react/3x2/MK').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  ML: () =>
    import('country-flag-icons/react/3x2/ML').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  MM: () =>
    import('country-flag-icons/react/3x2/MM').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  MN: () =>
    import('country-flag-icons/react/3x2/MN').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  MO: () =>
    import('country-flag-icons/react/3x2/MO').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  MP: () =>
    import('country-flag-icons/react/3x2/MP').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  MQ: () =>
    import('country-flag-icons/react/3x2/MQ').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  MR: () =>
    import('country-flag-icons/react/3x2/MR').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  MS: () =>
    import('country-flag-icons/react/3x2/MS').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  MT: () =>
    import('country-flag-icons/react/3x2/MT').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  MU: () =>
    import('country-flag-icons/react/3x2/MU').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  MV: () =>
    import('country-flag-icons/react/3x2/MV').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  MW: () =>
    import('country-flag-icons/react/3x2/MW').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  MX: () =>
    import('country-flag-icons/react/3x2/MX').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  MY: () =>
    import('country-flag-icons/react/3x2/MY').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  MZ: () =>
    import('country-flag-icons/react/3x2/MZ').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  NA: () =>
    import('country-flag-icons/react/3x2/NA').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  NC: () =>
    import('country-flag-icons/react/3x2/NC').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  NE: () =>
    import('country-flag-icons/react/3x2/NE').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  NF: () =>
    import('country-flag-icons/react/3x2/NF').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  NG: () =>
    import('country-flag-icons/react/3x2/NG').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  NI: () =>
    import('country-flag-icons/react/3x2/NI').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  NL: () =>
    import('country-flag-icons/react/3x2/NL').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  NO: () =>
    import('country-flag-icons/react/3x2/NO').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  NP: () =>
    import('country-flag-icons/react/3x2/NP').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  NR: () =>
    import('country-flag-icons/react/3x2/NR').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  NU: () =>
    import('country-flag-icons/react/3x2/NU').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  NZ: () =>
    import('country-flag-icons/react/3x2/NZ').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  OM: () =>
    import('country-flag-icons/react/3x2/OM').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  PA: () =>
    import('country-flag-icons/react/3x2/PA').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  PE: () =>
    import('country-flag-icons/react/3x2/PE').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  PF: () =>
    import('country-flag-icons/react/3x2/PF').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  PG: () =>
    import('country-flag-icons/react/3x2/PG').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  PH: () =>
    import('country-flag-icons/react/3x2/PH').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  PK: () =>
    import('country-flag-icons/react/3x2/PK').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  PL: () =>
    import('country-flag-icons/react/3x2/PL').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  PM: () =>
    import('country-flag-icons/react/3x2/PM').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  PR: () =>
    import('country-flag-icons/react/3x2/PR').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  PS: () =>
    import('country-flag-icons/react/3x2/PS').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  PT: () =>
    import('country-flag-icons/react/3x2/PT').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  PW: () =>
    import('country-flag-icons/react/3x2/PW').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  PY: () =>
    import('country-flag-icons/react/3x2/PY').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  QA: () =>
    import('country-flag-icons/react/3x2/QA').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  RE: () =>
    import('country-flag-icons/react/3x2/RE').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  RO: () =>
    import('country-flag-icons/react/3x2/RO').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  RS: () =>
    import('country-flag-icons/react/3x2/RS').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  RU: () =>
    import('country-flag-icons/react/3x2/RU').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  RW: () =>
    import('country-flag-icons/react/3x2/RW').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  SA: () =>
    import('country-flag-icons/react/3x2/SA').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  SB: () =>
    import('country-flag-icons/react/3x2/SB').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  SC: () =>
    import('country-flag-icons/react/3x2/SC').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  SD: () =>
    import('country-flag-icons/react/3x2/SD').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  SE: () =>
    import('country-flag-icons/react/3x2/SE').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  SG: () =>
    import('country-flag-icons/react/3x2/SG').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  SH: () =>
    import('country-flag-icons/react/3x2/SH').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  SI: () =>
    import('country-flag-icons/react/3x2/SI').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  SJ: () =>
    import('country-flag-icons/react/3x2/SJ').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  SK: () =>
    import('country-flag-icons/react/3x2/SK').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  SL: () =>
    import('country-flag-icons/react/3x2/SL').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  SM: () =>
    import('country-flag-icons/react/3x2/SM').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  SN: () =>
    import('country-flag-icons/react/3x2/SN').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  SO: () =>
    import('country-flag-icons/react/3x2/SO').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  SR: () =>
    import('country-flag-icons/react/3x2/SR').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  SS: () =>
    import('country-flag-icons/react/3x2/SS').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  ST: () =>
    import('country-flag-icons/react/3x2/ST').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  SV: () =>
    import('country-flag-icons/react/3x2/SV').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  SX: () =>
    import('country-flag-icons/react/3x2/SX').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  SY: () =>
    import('country-flag-icons/react/3x2/SY').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  SZ: () =>
    import('country-flag-icons/react/3x2/SZ').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  TA: () =>
    import('country-flag-icons/react/3x2/TA').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  TC: () =>
    import('country-flag-icons/react/3x2/TC').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  TD: () =>
    import('country-flag-icons/react/3x2/TD').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  TG: () =>
    import('country-flag-icons/react/3x2/TG').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  TH: () =>
    import('country-flag-icons/react/3x2/TH').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  TJ: () =>
    import('country-flag-icons/react/3x2/TJ').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  TK: () =>
    import('country-flag-icons/react/3x2/TK').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  TL: () =>
    import('country-flag-icons/react/3x2/TL').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  TM: () =>
    import('country-flag-icons/react/3x2/TM').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  TN: () =>
    import('country-flag-icons/react/3x2/TN').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  TO: () =>
    import('country-flag-icons/react/3x2/TO').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  TR: () =>
    import('country-flag-icons/react/3x2/TR').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  TT: () =>
    import('country-flag-icons/react/3x2/TT').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  TV: () =>
    import('country-flag-icons/react/3x2/TV').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  TW: () =>
    import('country-flag-icons/react/3x2/TW').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  TZ: () =>
    import('country-flag-icons/react/3x2/TZ').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  UA: () =>
    import('country-flag-icons/react/3x2/UA').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  UG: () =>
    import('country-flag-icons/react/3x2/UG').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  US: () =>
    import('country-flag-icons/react/3x2/US').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  UY: () =>
    import('country-flag-icons/react/3x2/UY').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  UZ: () =>
    import('country-flag-icons/react/3x2/UZ').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  VA: () =>
    import('country-flag-icons/react/3x2/VA').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  VC: () =>
    import('country-flag-icons/react/3x2/VC').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  VE: () =>
    import('country-flag-icons/react/3x2/VE').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  VG: () =>
    import('country-flag-icons/react/3x2/VG').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  VI: () =>
    import('country-flag-icons/react/3x2/VI').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  VN: () =>
    import('country-flag-icons/react/3x2/VN').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  VU: () =>
    import('country-flag-icons/react/3x2/VU').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  WF: () =>
    import('country-flag-icons/react/3x2/WF').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  WS: () =>
    import('country-flag-icons/react/3x2/WS').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  XK: () =>
    import('country-flag-icons/react/3x2/XK').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  YE: () =>
    import('country-flag-icons/react/3x2/YE').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  YT: () =>
    import('country-flag-icons/react/3x2/YT').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  ZA: () =>
    import('country-flag-icons/react/3x2/ZA').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  ZM: () =>
    import('country-flag-icons/react/3x2/ZM').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
  ZW: () =>
    import('country-flag-icons/react/3x2/ZW').then((module) => ({
      default: module.default as unknown as ComponentType<SVGProps<SVGSVGElement>>,
    })),
};
