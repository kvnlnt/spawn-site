.PHONY: help run docker
.DEFAULT_GOAL := help

dist: ## Run in development mode
	rsync -auz --progress ./ kevinlint@dev.toolhouse.com:/sites/evidence-finder.dev.toolhouse.com/www-root/

help: ## List available make commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'



