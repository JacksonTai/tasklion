package com.tasklion.backend.common.util;

import com.tasklion.backend.common.model.PaginationModel;
import org.springframework.data.domain.Pageable;

public class PageUtil {

    public static final int DEFAULT_PAGE = 1;
    public static final int DEFAULT_SIZE = 10;
    public static final int MAX_SIZE = 100;

    public static Pageable getPageable(int page, int size) {
        int validatedSize = Math.min(Math.max(size, 1), MAX_SIZE);
        int validatedPage = Math.max(page, 1) - 1;
        return Pageable.ofSize(validatedSize).withPage(validatedPage);
    }

    public static Pageable getPageable(PaginationModel paginationModel) {
        if (paginationModel == null) {
            return getPageable(DEFAULT_PAGE, DEFAULT_SIZE);
        }
        return getPageable(paginationModel.getPage(), paginationModel.getSize());
    }

}
