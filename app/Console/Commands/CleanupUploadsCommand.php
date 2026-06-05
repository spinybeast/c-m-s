<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use SplFileInfo;

class CleanupUploadsCommand extends Command
{
    protected $signature = 'security:cleanup-uploads
        {--path=uploads : Path inside public directory}
        {--execute : Actually delete suspicious files}';

    protected $description = 'Scan public uploads and remove suspicious executable files';

    private const DANGEROUS_EXTENSION_PATTERN = '/^(php\d*|phtml|phar|pht|cgi|pl|py|sh|bash|exe|dll|so)$/i';

    public function handle(): int
    {
        $relativePath = trim((string)$this->option('path'), '/');
        $basePath = public_path($relativePath);

        if (!is_dir($basePath)) {
            $this->error('Directory does not exist: ' . $basePath);
            return 1;
        }

        $suspiciousFiles = $this->findSuspiciousFiles($basePath);

        if (!$suspiciousFiles) {
            $this->info('No suspicious files found in: ' . $basePath);
            return 0;
        }

        $tableRows = array_map(static function (array $item): array {
            return [
                'file' => $item['file'],
                'reason' => $item['reason'],
            ];
        }, $suspiciousFiles);

        $this->warn('Suspicious files found: ' . count($suspiciousFiles));
        $this->table(['File', 'Reason'], $tableRows);

        if (!$this->option('execute')) {
            $this->comment('Dry-run mode. Add --execute to delete listed files.');
            return 0;
        }

        $deleted = 0;
        foreach ($suspiciousFiles as $item) {
            $absolutePath = $item['absolute'];
            if (@unlink($absolutePath)) {
                $deleted++;
                $this->line('Deleted: ' . $item['file']);
                continue;
            }

            $this->error('Failed to delete: ' . $item['file']);
        }

        $this->info('Deleted files: ' . $deleted . '/' . count($suspiciousFiles));
        return 0;
    }

    /**
     * @param string $basePath
     * @return array<int,array<string,string>>
     */
    private function findSuspiciousFiles(string $basePath): array
    {
        $result = [];

        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($basePath, RecursiveDirectoryIterator::SKIP_DOTS)
        );

        /** @var SplFileInfo $fileInfo */
        foreach ($iterator as $fileInfo) {
            if (!$fileInfo->isFile()) {
                continue;
            }

            $fileName = $fileInfo->getFilename();
            $extension = strtolower((string)$fileInfo->getExtension());
            if (!$extension) {
                continue;
            }

            if (!preg_match(self::DANGEROUS_EXTENSION_PATTERN, $extension)) {
                continue;
            }

            $absolute = $fileInfo->getPathname();
            $relative = ltrim(str_replace($basePath, '', $absolute), DIRECTORY_SEPARATOR);

            $result[] = [
                'file' => $relative,
                'reason' => 'dangerous extension: .' . $extension,
                'absolute' => $absolute,
            ];
        }

        return $result;
    }
}
