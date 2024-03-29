// export default {
//   theme: [
//     {
//       key: 'dark',
//       fileName: 'dark.css',
//       modifyVars: {
//         '@primary-color': '#4182fa',
//         '@success-color': '#5dbb2f',
//         '@info-color': '#4182fa',
//         '@warning-color': '#f59a3a',
//         '@error-color': '#e6383c',
//         '@highlight-color': '#1890ff',
//         '@body-background': '#212a3a',
//         '@component-background': '#212a3a',
//         '@icon-color': 'inherit',
//         '@icon-color-hover': '#f5f5f5',
//         '@heading-color': '#f5f5f5',
//         '@text-color': '#d2d4d7',
//         '@text-color-secondary': '#797f88',
//         '@text-selection-bg': '#212a3a',
//         '@border-color-base': '#3e4657',
//         '@border-color-split': '#212a3a',
//         '@popover-background': '#212a3a',
//         '@layout-body-background': '#10131c',
//         '@layout-header-background': '@component-background',
//         '@layout-sider-background': '@component-background',
//         '@layout-trigger-background': '@component-background',
//         '@font-feature-settings-base': 'tnum',
//         '@disabled-color': 'fade(@white, 30%)',
//         '@disabled-color-dark': 'fade(@white, 30%)',
//         '@outline-blur-size': '0',
//         '@background-color-light': 'fade(@white, 4%)',
//         '@background-color-base': 'fade(@white, 8%)',
//         '@item-hover-bg': 'fade(@white, 8%)',
//         '@shadow-color': 'rgba(0, 0, 0, 0.45)',
//         '@shadow-1-up':
//           '0 -6px 16px -8px rgba(0, 0, 0, 0.24), 0 -9px 28px 0 rgba(0, 0, 0, 0.15), 0 -12px 48px 16px rgba(0, 0, 0, 0.09)',
//         '@shadow-1-down':
//           '0 6px 16px -8px rgba(0, 0, 0, 0.24), 0 9px 28px 0 rgba(0, 0, 0, 0.15), 0 12px 48px 16px rgba(0, 0, 0, 0.09)',
//         '@shadow-1-left':
//           '-6px 0 16px -8px rgba(0, 0, 0, 0.08), -9px 0 28px 0 rgba(0, 0, 0, 0.05), -12px 0 48px 16px rgba(0, 0, 0, 0.03)',
//         '@shadow-1-right':
//           '6px 0 16px -8px rgba(0, 0, 0, 0.24), 9px 0 28px 0 rgba(0, 0, 0, 0.15), 12px 0 48px 16px rgba(0, 0, 0, 0.09)',
//         '@shadow-2':
//           '0 3px 6px -4px rgba(0, 0, 0, 0.36), 0 6px 16px 0 rgba(0, 0, 0, 0.24), 0 9px 28px 8px rgba(0, 0, 0, 0.15)',
//         '@btn-default-bg': 'transparent',
//         '@checkbox-check-color': '#1a212e',
//         '@form-error-input-bg': '#39404D',
//         '@input-placeholder-color': '#646b75',
//         '@input-bg': '#1A212E',
//         '@input-number-handler-active-bg': '#1a212e',
//         '@select-item-selected-font-weight': '600',
//         '@tooltip-bg': '#434343',
//         '@popover-bg': '@popover-background',
//         '@modal-header-bg': '@popover-background',
//         '@menu-popup-bg': '@popover-background',
//         '@menu-dark-submenu-bg': '@black',
//         '@table-header-bg': '#39404D',
//         '@table-header-sort-bg': '#39404D',
//         '@table-body-sort-bg': '#212a3a',
//         '@table-row-hover-bg': '#293140',
//         '@table-selected-row-bg': '#293140',
//         '@table-expanded-row-bg': '#293140',
//         '@time-picker-selected-bg': '#39404D',
//         '@badge-text-color': '@white',
//         '@card-actions-background': 'fade(@white, 4%)',
//         '@card-shadow':
//           '0 1px 2px -2px rgba(0, 0, 0, 0.48), 0 3px 6px 0 rgba(0, 0, 0, 0.36), 0 5px 12px 4px rgba(0, 0, 0, 0.27)',
//         '@avatar-bg': '#5a5a5a',
//         '@pagination-item-bg-active': 'transparent',
//         '@slider-rail-background-color': 'fade(@white, 20%)',
//         '@slider-rail-background-color-hover': '@slider-rail-background-color',
//         '@slider-track-background-color': '@primary-color',
//         '@slider-handle-color': '@primary-color',
//         '@tree-directory-selected-color': '#39404d',
//         '@skeleton-color': '#303030',
//         '@alert-success-border-color': '@green-3',
//         '@alert-success-bg-color': '#212A3A',
//         '@alert-info-border-color': '@blue-3',
//         '@alert-info-bg-color': '#212A3A',
//         '@alert-warning-border-color': '@gold-3',
//         '@alert-warning-bg-color': '#212A3A',
//         '@alert-error-border-color': '@red-3',
//         '@alert-error-bg-color': '#212A3A',
//       },
//     },
//     {
//       key: 'dust',
//       fileName: 'dust.css',
//       modifyVars: {
//         '@primary-color': '#4182fa',
//         '@success-color': '#5dbb2f',
//         '@info-color': '#4182fa',
//         '@warning-color': '#f59a3a',
//         '@error-color': '#e6383c',
//         '@highlight-color': '#1890ff',
//         '@body-background': '#212a3a',
//         '@component-background': '#212a3a',
//         '@icon-color': 'inherit',
//         '@icon-color-hover': '#f5f5f5',
//         '@heading-color': '#f5f5f5',
//         '@text-color': '#d2d4d7',
//         '@text-color-secondary': '#797f88',
//         '@text-selection-bg': '#212a3a',
//         '@border-color-base': '#3e4657',
//         '@border-color-split': '#212a3a',
//         '@popover-background': '#212a3a',
//         '@layout-body-background': '#10131c',
//         '@layout-header-background': '@component-background',
//         '@layout-sider-background': '@component-background',
//         '@layout-trigger-background': '@component-background',
//         '@font-feature-settings-base': 'tnum',
//         '@disabled-color': 'fade(@white, 30%)',
//         '@disabled-color-dark': 'fade(@white, 30%)',
//         '@outline-blur-size': '0',
//         '@background-color-light': 'fade(@white, 4%)',
//         '@background-color-base': 'fade(@white, 8%)',
//         '@item-hover-bg': 'fade(@white, 8%)',
//         '@shadow-color': 'rgba(0, 0, 0, 0.45)',
//         '@shadow-1-up':
//           '0 -6px 16px -8px rgba(0, 0, 0, 0.24), 0 -9px 28px 0 rgba(0, 0, 0, 0.15), 0 -12px 48px 16px rgba(0, 0, 0, 0.09)',
//         '@shadow-1-down':
//           '0 6px 16px -8px rgba(0, 0, 0, 0.24), 0 9px 28px 0 rgba(0, 0, 0, 0.15), 0 12px 48px 16px rgba(0, 0, 0, 0.09)',
//         '@shadow-1-left':
//           '-6px 0 16px -8px rgba(0, 0, 0, 0.08), -9px 0 28px 0 rgba(0, 0, 0, 0.05), -12px 0 48px 16px rgba(0, 0, 0, 0.03)',
//         '@shadow-1-right':
//           '6px 0 16px -8px rgba(0, 0, 0, 0.24), 9px 0 28px 0 rgba(0, 0, 0, 0.15), 12px 0 48px 16px rgba(0, 0, 0, 0.09)',
//         '@shadow-2':
//           '0 3px 6px -4px rgba(0, 0, 0, 0.36), 0 6px 16px 0 rgba(0, 0, 0, 0.24), 0 9px 28px 8px rgba(0, 0, 0, 0.15)',
//         '@btn-default-bg': 'transparent',
//         '@checkbox-check-color': '#1a212e',
//         '@form-error-input-bg': '#39404D',
//         '@input-placeholder-color': '#646b75',
//         '@input-bg': '#1A212E',
//         '@input-number-handler-active-bg': '#1a212e',
//         '@select-item-selected-font-weight': '600',
//         '@tooltip-bg': '#434343',
//         '@popover-bg': '@popover-background',
//         '@modal-header-bg': '@popover-background',
//         '@menu-popup-bg': '@popover-background',
//         '@menu-dark-submenu-bg': '@black',
//         '@table-header-bg': '#39404D',
//         '@table-header-sort-bg': '#39404D',
//         '@table-body-sort-bg': '#212a3a',
//         '@table-row-hover-bg': '#293140',
//         '@table-selected-row-bg': '#293140',
//         '@table-expanded-row-bg': '#293140',
//         '@time-picker-selected-bg': '#39404D',
//         '@badge-text-color': '@white',
//         '@card-actions-background': 'fade(@white, 4%)',
//         '@card-shadow':
//           '0 1px 2px -2px rgba(0, 0, 0, 0.48), 0 3px 6px 0 rgba(0, 0, 0, 0.36), 0 5px 12px 4px rgba(0, 0, 0, 0.27)',
//         '@avatar-bg': '#5a5a5a',
//         '@pagination-item-bg-active': 'transparent',
//         '@slider-rail-background-color': 'fade(@white, 20%)',
//         '@slider-rail-background-color-hover': '@slider-rail-background-color',
//         '@slider-track-background-color': '@primary-color',
//         '@slider-handle-color': '@primary-color',
//         '@tree-directory-selected-color': '#39404d',
//         '@skeleton-color': '#303030',
//         '@alert-success-border-color': '@green-3',
//         '@alert-success-bg-color': '#212A3A',
//         '@alert-info-border-color': '@blue-3',
//         '@alert-info-bg-color': '#212A3A',
//         '@alert-warning-border-color': '@gold-3',
//         '@alert-warning-bg-color': '#212A3A',
//         '@alert-error-border-color': '@red-3',
//         '@alert-error-bg-color': '#212A3A',
//       },
//     },
//   ],
// };
