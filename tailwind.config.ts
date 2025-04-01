/**
 * Tailwind CSS v4設定ファイル
 * プロジェクト用のテーマや拡張機能を定義
 */
import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontSize: {
                'xs': '0.75rem',    // 12px
                'sm': '0.875rem',   // 14px
                'base': '1rem',     // 16px
                'lg': '1.125rem',   // 18px
                'xl': '1.25rem',    // 20px
                '2xl': '1.5rem',    // 24px
                '3xl': '1.875rem',  // 30px
                '4xl': '2.25rem',   // 36px
            },
            colors: {
                gray: {
                    500: '#6b7280',
                    900: '#111827',
                },
                green: {
                    600: '#059669',
                },
                blue: {
                    600: '#2563eb',
                },
            },
        },
    },
}

export default config
